import React, { useEffect, useState } from "react";
import Login from "../Login";

type Props = { children: any };

function Authenticate({ children }: Props) {
  const [Authenticate, setAuthenticate] = useState<{
    authenticated: boolean;
    time: string;
  }>();

  const login = (data: any) => {
    console.log(data);
    if (data.username === "admin-resto-app" && data.password === "1234") {
      console.log("COINCIDENT");

      const authenticationObj = {
        authenticated: true,
        time: Date.now().toString(),
      };

      setAuthenticate(authenticationObj);
      localStorage.setItem("auth", JSON.stringify(authenticationObj));
    }
    console.log("NOT COINCIDENT");
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) setAuthenticate(JSON.parse(auth));
  }, []);

  return (
    <>
      {!Authenticate && <Login login={login} />}
      {Authenticate && <>{children}</>}
    </>
  );
}

export default Authenticate;
