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

const BASE_URL = window.location.origin;

export default function Home() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formState] = Form.useForm()

  const onSubmit = useCallback(async (payload: ICreateUrl) => {
    setIsLoading(true);
    const res = await url.create(payload);
    setResult(`${BASE_URL}/${res.id}`);
    setIsLoading(false);
  }, []);

  const onReset = useCallback(() => {
    formState.resetFields();
    setResult("");
    setIsLoading(false);
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Qashir URL Shortener</title>
        <meta name="description" content="Qashir URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Qashir URL Shortener</h2>

        <Form className={styles.form} form={formState} name="urlShortener" onFinish={onSubmit}>
          {result.length > 0 ? (
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
              <RoundedTextInput size="large" style={{ width: "40rem" }} placeholder="Shorten Your URL Here!" />
            </Form.Item>
          )}

          <Form.Item name="url" style={{ marginTop: "5px" }}>
            {result.length > 0 ? (
              <Button
                className={styles.formButton}
                type="primary"
                htmlType="button"
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
