import React from "react";
import "./Test.css";
import Chart1 from "../components/Chart1";
import DashboardNavbar from "../components/DashboardNavbar";
import CenterChart from "../components/CenterChart";
import LowestSatisfactionCard from "../components/LowestSatisfactionCard";
import SatisfactionChart from "../components/SatisfactionChart";
import OCPFR from "../assets/OCPFR.png";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Test = () => {
  const products = [
    {
      name: "Product 1",
      image: "product1.jpg",
      price: 29.99,
      category: "Category A",
      rating: 4,
      status: "INSTOCK",
    },
    {
      name: "Product 2",
      image: "product2.jpg",
      price: 19.99,
      category: "Category B",
      rating: 3,
      status: "OUTOFSTOCK",
    },
    {
      name: "Product 3",
      image: "product3.jpg",
      price: 49.99,
      category: "Category A",
      rating: 5,
      status: "LOWSTOCK",
    },
    {
      name: "Product 4",
      image: "product4.jpg",
      price: 39.99,
      category: "Category C",
      rating: 2,
      status: "INSTOCK",
    },
    {
      name: "Product 5",
      image: "product5.jpg",
      price: 24.99,
      category: "Category B",
      rating: 4,
      status: "INSTOCK",
    },
    {      name: "Product 6",
      image: "product6.jpg",
      price: 34.99,
      category: "Category C",
      rating: 3,
      status: "OUTOFSTOCK",
    },
    {      name: "Product 7",
      image: "product7.jpg",
      price: 44.99,
      category: "Category A",
      rating: 5,
      status: "LOWSTOCK",
    },
    {      name: "Product 8",
      image: "product8.jpg",
      price: 54.99,
      category: "Category B",
      rating: 2,
      status: "INSTOCK",
    },
    {      name: "Product 9",
      image: "product9.jpg",
      price: 64.99,
      category: "Category C",
      rating: 4,
      status: "OUTOFSTOCK",
    },
    {      name: "Product 10",
      image: "product10.jpg",
      price: 74.99,
      category: "Category A",
      rating: 3,
      status: "LOWSTOCK",
    },
    // ... d'autres produits
  ];


  const paginatorLeft = <button className="p-2">⬅️</button>;
const paginatorRight = <button className="p-2">➡️</button>;

  const header = <h2 className="text-xl font-semibold">Product List</h2>;
  const footer = `Total Products: ${products.length}`;

  const imageBodyTemplate = (rowData) => {
    return <img src={OCPFR} alt={rowData.name} width="50" />;
  };

  const priceBodyTemplate = (rowData) => {
    return `$${rowData.price.toFixed(2)}`;
  };

  const ratingBodyTemplate = (rowData) => {
    return <span>{"⭐".repeat(rowData.rating)}</span>;
  };

  const statusBodyTemplate = (rowData) => {
    const statusClass =
      {
        INSTOCK: "text-green-500",
        OUTOFSTOCK: "text-red-500",
        LOWSTOCK: "text-orange-500",
      }[rowData.status] || "text-gray-500";

    return <span className={statusClass}>{rowData.status}</span>;
  };

  return (
    <>
      <DataTable
        value={products}
        header={header}
        footer={footer}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
       
      >
        <Column field="name" header="Name"></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
        <Column field="category" header="Category"></Column>
        <Column
          field="rating"
          header="Reviews"
          body={ratingBodyTemplate}
        ></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
      </DataTable>
    </>
  );
};

export default Test;

// const data1 = [
//   { name: "Très satisfait", value: 40 },
//   { name: "Satisfait", value: 60 },
//   { name: "Pas satisfait", value: 20 },
//   { name: "Pas satisfait du tout", value: 10 },
// ];
// const data2 = [
//   { name: "Très satisfait", value: 10 },
//   { name: "Satisfait", value: 10 },
//   { name: "Pas satisfait", value: 40 },
//   { name: "Pas satisfait du tout", value: 20 },
// ];
// const data3 = [
//   { name: "Très satisfait", value: 20 },
//   { name: "Satisfait", value: 30 },
//   { name: "Pas satisfait", value: 20 },
//   { name: "Pas satisfait du tout", value: 10 },
// ];

// <DashboardNavbar />
// <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-min">
//   {/* Chart1 (Main Chart) */}
//   <div className="lg:col-span-4 lg:row-span-4">
//     <Chart1 />
//   </div>

//   {/* Lowest Satisfaction Card */}
//   <div className="lg:col-span-2 lg:row-span-4">
//     <LowestSatisfactionCard
//       badPercentage={70}
//       centerName="Benguerir SI"
//     />
//   </div>

//   {/* Center Charts */}
//   <div className="lg:col-span-2 lg:row-span-3">
//     <SatisfactionChart data={data1} centerName="Casablanca Siege" />
//   </div>
//   <div className="lg:col-span-2 lg:row-span-3">
//     <SatisfactionChart data={data2} centerName="Benguerir SI" />
//   </div>
//   <div className="lg:col-span-2 lg:row-span-3">
//     <SatisfactionChart data={data3} centerName="Youssoufia SI" />
//   </div>
// </div>
