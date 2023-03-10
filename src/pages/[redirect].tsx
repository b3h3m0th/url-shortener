import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Redirect = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (router.query.redirect) {
      setToken(router.query.redirect as string);
      console.log(router.query.redirect);
    }
  }, [router.query.redirect]);

  const { data } = api.shorten.getOriginal.useQuery({
    token: token ?? "asfd",
  });

  if (data?.url) void router.push(data.url);

  console.log("hi", data?.url);
  console.log(token);

  return data?.url ? (
    <p>
      Click <Link href={data.url}>here</Link> if you don't get redirect
      automatically.
    </p>
  ) : null;
};

export default Redirect;
