import React, { useState, useEffect } from "react";
import Cosmic from "cosmicjs";
import PageTitle from "../../components/PageTitle";
import HomeContainer from "../HomeContainer";
import Container from "../../components/Container";

const StopsContainer = () => {
  console.log("stopsContainer is running=>");

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    console.log("useEffect of stopsContainer is running=>");

    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.VERCEL_ENV.BUCKET_SLUG,
      read_key: process.VERCEL_ENV.READ_KEY,
    });

    bucket
      .getObjects({
        type: "underverkene",
        props: "title,slug",
        limit: 8,
      })
      .then((data) => {
        setPageData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderSkeleton() {
    return <p>Side laster inn....</p>;
  }

  function renderPage() {
    return (
      <Container>
        <ul>
          {pageData.objects.map((item) => {
            return (
              <li>
                <div href={`/stop/${item.slug}`}>{item.title}</div>
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }

  return <>{pageData === null ? renderSkeleton() : renderPage()}</>;
};

export default StopsContainer;
