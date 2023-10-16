import { Table } from "@mui/joy";
import React from "react";
import { Order } from "../../interfaces/Order";
import OrderTableItem from "./OrderTableItem";

type Props = { orders: Order[]; displayOnly?: boolean };

export default function OrderTable({ orders, displayOnly }: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Menúes</th>
          <th>Precio Final (En $ARS)</th>
          <th>Estado</th>
          {!displayOnly && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          if (typeof order === "string") {
            return (
              <OrderTableItem
                order={JSON.parse(order)}
                displayOnly={displayOnly}
              ></OrderTableItem>
            );
          } else {
            return (
              <OrderTableItem
                order={order}
                displayOnly={displayOnly}
              ></OrderTableItem>
            );
          }
        })}
      </tbody>
    </Table>
  );
}
