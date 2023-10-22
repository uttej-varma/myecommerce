import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(-1);
  function handleEdit( data, index) {
    console.log(data);
    const newUser = { ...user, addresses: [...user.addresses] }; //for shallow copy issue
    newUser.addresses.splice(index, 1, data);
    dispatch(updateUserAsync(newUser));
    setShowEditForm(-1);
  }
  function handleRemove(e, index) {
    const newUser = { ...user, addresses: [...user.addresses] }; //for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }
  function handleEditForm(e, ind) {
    setShowEditForm(ind);
    const address=user.addresses[ind];
    setValue('name',address.name)
    setValue('gmail',address.gmail)
    setValue('phone',address.phone)
    setValue('street',address.street)
    setValue('city',address.city)
    setValue('state',address.state)
    setValue('pincode',address.pincode)
  }
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Name: {user.Name ? user.Name : "guest User"}
          </h1>
          <h3 className="text-1xl font-bold tracking-tight text-red-600">
            email Address:{user.email ? user.email : ""}
          </h3>
          {user.role==="admin" &&
            <h3 className="text-1xl font-bold tracking-tight text-red-600">
            role:{user.role}
          </h3>
          }
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            <button
                              type="button"
                              className="font-medium px-3 py-1 text-white bg-green-600 br"
                            >
                              Add address
                            </button>
                          </p>
              <p className="mt-0.5 text-sm text-gray-500">Your address:</p>
              {user.addresses.map((val, ind) => {
                return (
                  <div key={ind}>
                    {showEditForm === ind && (
                      <form
                        className="bg-white px-5 py-2 mt-12"
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          handleEdit(data, ind);
                        })}
                      >
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "name is required",
                                  })}
                                
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("gmail", {
                                    required: "email is required",
                                  })}
                                  
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("phone", {
                                    required: "phone is required",
                                  })}
                                  type="tel"
                                
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "street is required",
                                  })}
                                  
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "city is required",
                                  })}
                                  
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "state is required",
                                  })}
                                  
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pincode", {
                                    required: "pincode is required",
                                  })}
                                  
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                        onClick={(e)=>{setShowEditForm(-1)}}
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="flex justify-between gap-x-5 py-1 ">
                      <div className="flex items-center justify-around  min-w-0 w-full gap-x-4 border-2 border-solid pl-2">
                        <div className="min-w-0 flex-auto text-center">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {val.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {val.gmail}
                          </p>
                        </div>
                        <div className="min-w-0 flex-auto text-center">
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            phone:{val.phone}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {val.city}
                          </p>
                        </div>
                        <div className="min-w-0 flex-auto text-center">
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            <button
                              onClick={(e) => {
                                handleEditForm(e, ind);
                              }}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Edit
                            </button>
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            <button
                              onClick={(e) => {
                                handleRemove(e, ind);
                              }}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
