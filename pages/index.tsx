import Head from "next/head";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/layout/MainLayout";
import { Form, Button, Spin } from "antd";
import { useCallback, useState } from "react";
import RoundedTextInput from "../components/RounderTextInput";
import { ICreateUrl } from "../model/url";
import * as url from "../api/url";

const URL_REGEX =
  /^(https?:\/\/)([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/i;

export default function Home() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (payload: ICreateUrl) => {
    setIsLoading(true);
    const res = await url.create(payload);
    setResult(res.url);
    setIsLoading(false);
  }, []);

  const onReset = useCallback(() => {
    setResult("");
    setIsLoading(false);
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Shorten Your URL Here!</h2>

        <Form className={styles.form} name="urlShortener" onFinish={onSubmit}>
          {result ? (
            <p>{result}</p>
          ) : (
            <Form.Item
              name="url"
              rules={[
                { required: true, message: "Cannot empty!" },
                {
                  pattern: URL_REGEX,
                  message: "Must be a url with http or https!",
                },
              ]}
            >
              <RoundedTextInput size="large" style={{ width: "40rem" }} />
            </Form.Item>
          )}

          <Form.Item name="url" style={{ marginTop: "5px" }}>
            {result ? (
              <Button
                className={styles.formButton}
                type="primary"
                size="large"
                block
                onClick={onReset}
              >
                Submit Another
              </Button>
            ) : isLoading ? (
              <Spin />
            ) : (
              <Button
                className={styles.formButton}
                type="primary"
                htmlType="submit"
                size="large"
                block
              >
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </main>

      <footer className={styles.footer}>
        Copyright 2021 &nbsp;
        <a
          href="https://ranggarifqi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ranggarifqi.com
        </a>
      </footer>
    </MainLayout>
  );
}
