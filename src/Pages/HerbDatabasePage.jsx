import React from "react";
import HerbsDatabase from "../Components/HerbsDatabase";
import Herbtrack from "../Components/Herbtrack";
import Slideshow from "../Components/Slideshow";
import Chatbot from "../Components/Chatbot";
// If you have a QR generator component, import it here:
// import QRGenerator from "../Components/QRGenerator";

export default function HerbDatabasePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Herb Database</h1>
      <HerbsDatabase />
      <Herbtrack />
      {/* <QRGenerator /> */}
      <Slideshow />
      <Chatbot />
    </div>
  );
}
