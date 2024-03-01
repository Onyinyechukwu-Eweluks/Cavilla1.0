"use client";
import React, { useEffect, useState } from "react";
import { addBusinessData } from "@/app/serverComponents/businessApi";
import { getCategory, CategoryData } from "@/app/serverComponents/categoryApi";
// const categories: any = getCategory();
// console.log(categories);
// let cat;
// getCategory()
//   .then((res) => {return res})
//   .catch((error) => console.log(error));

//   console.log(cat)

function RegisterBusiness() {
  useEffect(() => {
    async function category() {
      const data = await getCategory();
      setCat(data);
    }
    category();
  }, []);
  const formValues = {
    businessName: "",
    ownerName: "",
    address: "",
    city: "",
    country: "",
    mobileNumber: 0,
    officeNumber: 0,
    email: "",
    category: "",
    liscence: "",
    description: "",
    password: "",
  };
  const [state, setState] = useState(formValues);
  const [cat, setCat] = useState<CategoryData[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Business Information
        </h2>
        <p className="mt-1 text-sm leading-8 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <form action="">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="business-name"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Business name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="business-name"
                  value={state.businessName}
                  onChange={(e) => handleChange(e)}
                  id="business-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="owners-name"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Owners name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="owners-name"
                  value={state.ownerName}
                  onChange={(e) => handleChange(e)}
                  id="owners-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  value={state.description}
                  onChange={(e) => handleChange(e)}
                  id="description"
                  autoComplete="description"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email1"
                  name="email"
                  value={state.email}
                  onChange={(e) => handleChange(e)}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  value={state.category}
                  onChange={(e) => handleChange(e)}
                  data-te-select-init
                  data-te-select-size="lg"
                  autoComplete="category-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-8"
                >
                  {/* <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option> */}
                  {cat.map((c, i) => (
                    <option key={i} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  value={state.address}
                  onChange={(e) => handleChange(e)}
                  id="address"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={(e) => handleChange(e)}
                  id="password"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="lisence"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Lisence
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lisence"
                  value={state.liscence}
                  onChange={(e) => handleChange(e)}
                  id="lisence"
                  placeholder="Lisence id"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="country"
                  value={state.country}
                  onChange={(e) => handleChange(e)}
                  id="country"
                  autoComplete="country"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  value={state.city}
                  onChange={(e) => handleChange(e)}
                  id="city1"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="mobile-number"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="mobile-number"
                  value={state.mobileNumber}
                  onChange={(e) => handleChange(e)}
                  id="mobile-number"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="office-number"
                className="block text-sm font-medium leading-8 text-gray-900"
              >
                Office Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="office-number"
                  value={state.officeNumber}
                  onChange={(e) => handleChange(e)}
                  id="office-number"
                  autoComplete="office-number"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                />
              </div>
            </div>

            <div className="justify-items-end">
              <button
                type="button"
                className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterBusiness;
