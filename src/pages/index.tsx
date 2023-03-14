import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { object, string } from "yup";
import { api } from "~/utils/api";
import { useFormik } from "formik";

const Home: NextPage = () => {
  const urlForm = useFormik({
    initialValues: { url: "" },
    validationSchema: object({
      url: string().url().required(),
    }),
    onSubmit: () => {
      refetch()
        .then((x) => x)
        .catch(() => void 0);
    },
  });
  const { data, refetch } = api.shorten.insert.useQuery(
    { url: urlForm.values.url },
    { enabled: false }
  );

  return (
    <div className="home">
      <Head>
        <title>Salatwürzer</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Image
          src="/salatwürzer.png"
          height={200}
          width={200}
          alt="Salatwürzer"
        />
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Salatwürzer Linkverkürzer
        </h1>
        <div>
          <input
            name="url"
            type="url"
            value={urlForm.values.url}
            onChange={urlForm.handleChange}
            onBlur={urlForm.handleBlur}
            placeholder="Dein Link"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          {(!urlForm.values.url || !urlForm.isValid) && urlForm.dirty ? (
            <span className="text-sm text-red-600">Keine gültiger Link</span>
          ) : null}
        </div>
        <button
          className={`shorten-button rounded bg-blue-500 py-2 px-4 font-bold text-white ${
            !urlForm.values.url || !urlForm.isValid
              ? "shorten-button cursor-not-allowed opacity-50"
              : "shorten-button hover:bg-blue-700"
          }`}
          onClick={void urlForm.handleSubmit}
          disabled={!urlForm.values.url || !urlForm.isValid}
        >
          Link verkürzen
        </button>
        <h2 className="output">{data?.url ? <h2>{data.url}</h2> : null}</h2>
      </main>
    </div>
  );
};

export default Home;
