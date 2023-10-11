import React from "react";
import OrderComponent from "./OrderComponent";

type Props = { messages: any[] };

export default function OrderList({ messages }: Props) {
  return (
    <>
      {messages
        .sort((a, b) => a.id - b.id)
        .map((N) => (
          <OrderComponent message={N}></OrderComponent>
        ))}
    </>
  );
}
