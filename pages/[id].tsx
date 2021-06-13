import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { fetchById } from "../api/url";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id ?? null;

  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const data = await fetchById(id as string);
    return {
      redirect: {
        destination: data.url,
        permanent: true,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
};

const IdPage = () => {
  return <></>;
};

export default IdPage;
