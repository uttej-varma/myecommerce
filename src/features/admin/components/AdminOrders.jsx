import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectTotalOrders,
  selectTotalOrdersCount,
  updateOrderByIdAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../../commonComponents/Pagination";
export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const dispatch = useDispatch();
  const totalOrders = useSelector(selectTotalOrdersCount);
  const orders = useSelector(selectTotalOrders);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  function handleShow(order) {}
  function handleEdit(order) {
    setEditableOrderId(order.id);
  }
  function handleUpdate(e, order) {
    const updatedOrder = { ...order };
    updatedOrder.status = e.target.value;
    dispatch(updateOrderByIdAsync(updatedOrder));
    setEditableOrderId(-1);
  }
  function handlePage(page) {
    setPage(page);
  }
  function handleSort(sortOption) {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  }
  function chooseColor(status) {
    switch (status) {
      case "pending":
        return `bg-purple-200 text-purple-600`;
      case "dispatched":
        return `bg-yellow-200 text-Yellow-600`;
      case "delivered":
        return `bg-green-200 text-green-600`;
      case "cancelled":
        return `bg-red-200 text-red-600`;
      default:
        return `bg-purple-200 text-purple-600`;
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "desc" ? "asc" : "desc",
                        })
                      }
                    >
                      #Order {' '}{sort?._sort==='id' &&(sort?._order==='desc'?<ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>:<ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>)}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "desc" ? "asc" : "desc",
                        })
                      }
                    >
                      Total Amount {' '}{sort?._sort==='totalAmount' && (sort?._order==='desc'?<ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>:<ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>)}
                    </th>
                    <th className="py-3 px-6 text-center">ShippingAddress</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order, ind) => {
                    return (
                      <tr
                        key={ind}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map((item, ind) => (
                            <div className="flex items-center" key={ind}>
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span>
                                {item.title}-qty:{item.quantity}-$
                                {discountedPrice(item)}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            ${order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div>
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>
                          <div>{order.selectedAddress.phone},</div>
                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.state}</div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={(e) => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="disapatched">Disapatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon
                                className="w-7 h-7"
                                onClick={(e) => handleShow(order)}
                              ></EyeIcon>
                            </div>
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon
                                className="w-7 h-7"
                                onClick={(e) => handleEdit(order)}
                              ></PencilIcon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </>
  );
}
