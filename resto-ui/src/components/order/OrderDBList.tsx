import OrderDBComponent from "./OrderDBComponent";

type Props = { messages: any[] };

export default function OrderDBList({ messages }: Props) {


    
  return (
    <>
      {messages
        .sort((a, b) => a.id - b.id)
        .map((N) => (
          <OrderDBComponent message={N}></OrderDBComponent>
        ))}
    </>
  );
}
