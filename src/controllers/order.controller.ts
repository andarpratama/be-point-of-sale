import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { ItemOrderModel } from "../models/item.order.model";
import { UnitModel } from "../models/unit.model";
import ErrorHandler from "../middlewares/errorHandler";
import { ProductModel } from "../models/product.model";
import { EstatementModel } from "../models/estatement.model";
import { ItemPurchaseSchema } from "../models/item.po.model";

class OrderController {
    static async createOrder(req: Request, res: Response, next: NextFunction) {
      //  const nota = req.body.nota
       function next_id(input:any) {
         var output:any = parseInt(input, 10);
         output += "";
         while (output.length < 2) output = "0" + output;
         return output;
      }

      function next_id2(input:any) {
         var output:any = parseInt(input, 10) + 1;
         output += "";
         while (output.length < 4) output = "0" + output;
         return output;
      }

      let nota:any
      let tanggal = new Date().getDate()
      let bulan = new Date().getMonth()
      let tahun:any = new Date().getFullYear()
      tahun += ""
      
      const orderData:any = await OrderModel.find()
      if (!orderData[0]) {
         nota = 'NT' + tahun.slice(2) + next_id(bulan) + next_id(tanggal) + '0001'
      } else {
         const no_nota = orderData.pop().nota
         nota = 'NT' + tahun.slice(2) + next_id(bulan) + next_id(tanggal) + next_id2(no_nota.slice(8))
         console.log(next_id2(no_nota.slice(8)))
      }
      
      // console.log(nota)
      
      try {
         const newOrder = await OrderModel.create({
            nota: nota
         })
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Create Order`,
            data: newOrder
         });
      } catch (error) {
         next(error)
      }
    }
    static getOrder(req: Request, res: Response, next: NextFunction) {
        OrderModel.find()
         .then((resOrder) => {
               res.status(201).json({
                  message: "Success Find All Order",
                  data: resOrder,
               });
         })
         .catch((err) => {
               next(err);
         });
    }
   
   static async getOneOrder(req: Request, res: Response, next: NextFunction) {
      try {
         const foundOrder = await OrderModel.findById(req.params.id_order)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Get One Order`,
            data: foundOrder
         })
      } catch (error) {
         next(error)
      }
   }

   static getAllItem(req: Request, res: Response, next: NextFunction) {
        ItemOrderModel.find()
         .then((resOrder) => {
            res.status(201).json({
               message: "Success Find All Item Order",
               data: resOrder,
            });
         })
         .catch((err) => {
               next(err);
         });
    }
   
   static async getOneItem(req: Request, res: Response, next: NextFunction) {
      try {
         const foundItem = await ItemOrderModel.findById(req.params.id_item)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Get One Item`,
            data: foundItem
         })
      } catch (error) {
         next(error)
      }
   }
   
   static async addItemOrder(req: Request, res: Response, next: NextFunction) {
      let { product, unit, quantity, priceTotal } = req.body

      // Get id product dari code product
      const foundProduct:any = await ProductModel.findOne({code: product})
      const productID = foundProduct._id

      const foundUnit:any = await UnitModel.findById(unit)
      priceTotal = parseInt(quantity) * parseInt(foundUnit.sellPrice)

      try {
         const addedItem = await ItemOrderModel.create({
            product: productID,
            unit: unit,
            quantity: quantity,
            priceTotal: priceTotal,
         })

         const pushedItem = await OrderModel.findByIdAndUpdate(
            req.params.id_order,
            {
            $push: { 'items': addedItem },
            $inc: {'subTotal': priceTotal, 'totalPrice': priceTotal}
            }, {new: true}
         )

         res.status(200).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `Add Item Order`,
            data: addedItem,
            dataOrder: pushedItem
         });

      } catch (error) {
         next(error)
      }
      
   }

   static async paid(req: Request, res: Response, next: NextFunction) {
      let { totalPrice, pricePaid } = req.body
      const refund = parseInt(pricePaid)  - parseInt(totalPrice)

      try {
         const paidOrder:any = await OrderModel.findByIdAndUpdate(req.params.id_order, {
            pricePaid: pricePaid,
            statusOrder: 'paid',
            refund: refund
         }, { new: true })

         const incomeInvoice = await EstatementModel.create({
            name: 'Order' + ' ' + paidOrder.nota,
            debit: totalPrice,
         })

         // Update stock di produk unit
         const foundDataOrder:any = await OrderModel.findById(req.params.id_order)
         const itemOrder = foundDataOrder.items
         itemOrder.forEach(async (item:any) => {
            const unitID = item.unit
            const updatedStock = await UnitModel.findByIdAndUpdate(unitID, {
               $inc: {'stock': - item.quantity, 'soldCount': item.quantity}
            }, {new: true})
         });
         
         res.status(200).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `Paid Order`,
            data: paidOrder,
            incomeInvoice: incomeInvoice
         });
      } catch (error) {
         next(error)
      }
   }

   static async addTax(req: Request, res: Response, next: NextFunction) {
      try {
         const foundOrder:any = await OrderModel.findById(req.params.id_order)
         const taxPrice = (10 / 100) * foundOrder.totalPrice 
         const totalPrice = foundOrder.totalPrice + taxPrice

         const addedTax = await OrderModel.findByIdAndUpdate(req.params.id_order, {
            tax: true,
            totalPrice: totalPrice,
            taxPrice: taxPrice
         }, { new: true })

         res.status(200).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `Added Tax`,
            data: addedTax
         });
      } catch (error) {
         next(error)
      }
   }

   static async deleteTax(req: Request, res: Response, next: NextFunction) {
      try {
         const foundOrder:any = await OrderModel.findById(req.params.id_order)
         const deletedTax = foundOrder.totalPrice - foundOrder.taxPrice
         const deleteTaxt = await OrderModel.findByIdAndUpdate(req.params.id_order, {
            tax: false,
            totalPrice: deletedTax,
            taxPrice: 0
         }, { new: true })

         res.status(200).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `Delete Tax`,
            data: deleteTaxt
         });
      } catch (error) {
         next(error)
      }
   }

   static async cancelOrder(req: Request, res: Response, next: NextFunction) {
      try {
         const cancelOrder = await OrderModel.findByIdAndUpdate(req.params.id_order, {
            statusOrder: 'cancel',
            cancelMessage: req.body.cancelMessage
         }, { new: true })

         res.status(200).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `Cancel Order`,
            data: cancelOrder
         });
      } catch (error) {
         next(error)
      }
   }

   static async deleteItem(req: Request, res: Response, next: NextFunction) {
      const foundItem:any = await ItemOrderModel.findById(req.params.id_item)
      const foundOrder:any = await OrderModel.findById(req.params.id_order)

      try {
         const updatedOrder = await OrderModel.findByIdAndUpdate(foundOrder?._id, {
            $pull: { 'items': { _id: foundItem._id } },
            $inc: {'subTotal': - foundItem.priceTotal, 'totalPrice': - foundItem.priceTotal}
         }, { new: true })

         res.status(200).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `Delete Item Order`,
            data: updatedOrder,
         });
      } catch (error) {
         next(error)
      }
   }

    static async editOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderID = req.params.id;
            const editDataOrder: any = {
                nota: req.body.nota,
                tax: req.body.tax,
                totalPrice: req.body.totalPrice,
            };

            for (const key in editDataOrder) {
                if (!editDataOrder[key]) {
                    delete editDataOrder[key];
                }
            }
            const updateDataOrder = await OrderModel.findByIdAndUpdate(
                orderID,
                editDataOrder,
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit Order`,
                data: updateDataOrder,
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const orderID = req.params.id;
        const foundOrder = await OrderModel.findById(orderID);

        try {
            if (!orderID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundOrder) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await OrderModel.findByIdAndUpdate(
                orderID,
                { status: false },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory Order",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getDetailOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const detailOrder = await OrderModel.findById(req.params.id);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get Detail Order",
                data: detailOrder,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default OrderController;
