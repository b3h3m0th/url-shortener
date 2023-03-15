/* eslint-disable react/no-unescaped-entities */
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
    }
  }, [router.query.redirect]);

  const { data } = api.shorten.getOriginal.useQuery({
    token: token ?? "",
  });

  if (data?.url) void router.push(data.url);

  return data?.url ? (
    <p>
      Click <Link href={data.url}>here</Link> if you don't get redirect
      automatically.
    </p>
  ) : null;
};

export default Redirect;
