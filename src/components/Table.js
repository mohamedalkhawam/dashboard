import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
export default function Table({ Thead, Tbody }) {
  return (
    <table className="border-collapse w-full shadow-lg hover:shadow-lg table-auto ">
      <thead>
        <tr>{Thead}</tr>
      </thead>
      <tbody>{Tbody}</tbody>
    </table>
  );
}
