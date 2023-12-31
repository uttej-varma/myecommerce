import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserInfoStatus, userOrders } from "../userSlice";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";
import { BallTriangle } from "react-loader-spinner";
export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(userOrders);
  const status=useSelector(selectUserInfoStatus)
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
   <>
    {
      orders && 
      <div>
      {orders.map((order, ind) => {
        return (
          <div key={ind}>
            <div>
              <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Order Number #{order.id}
                </h1>
                <h3 className="text-1xl font-bold tracking-tight text-red-600">
                  Order status :{order.status}
                </h3>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">{item.product.title}</a>
                                </h3>
                                <p className="ml-4">${discountedPrice(item.product)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>

                              <div className="flex">

                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$ {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total Items in cart</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping address:
                    </p>
                    <div
                      className="flex justify-between gap-x-5 py-1 "
                    >
                      <div className="flex items-center  min-w-0 w-full gap-x-4 border-2 border-solid pl-2">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.gmail}
                          </p>
                        </div>
                        <div className="min-w-0 flex-auto">
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            phone:{order.selectedAddress.phone}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    }
    {status==='loading'?
    <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="rgb(79,20,229)"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
    />:null}
   </>
  );
}

