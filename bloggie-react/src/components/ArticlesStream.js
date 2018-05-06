import React from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

const ArticlePreview = ({data}) => {
    return (
        <div style={{
            marginBottom: 50,
            padding: 20,
            backgroundColor: '#e5e6f5',
            borderColor: '#b4b5c4',
            borderWidth: 2
        }}>
            <b><p>{data.title}</p></b>
            <p>
                {data.authors[0].name} ({data.releaseDate.split("T")[0]}): <i>{data.teaser}</i>
            </p>
        </div>
    )
}

const ArticlesStream = ({loading, articles, error}) => {
    console.log(articles)

    if (loading) {
        return <p>Loading ...</p>
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>
    }

    return (
        <div style={{paddingLeft: 300, paddingRight: 300, paddingTop: 50}}>
            {articles.map((a, key) => <ArticlePreview key={key} data={a}/>)}
        </div>
    )
}

const articlesQuery = gql`
  query articles {
    articles {
      id
      permalink
      title
      teaser
      releaseDate
      authors {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`

export default graphql(articlesQuery, {
    props: ({ownProps, data}) => ({
        loading: data.loading,
        error: data.error,
        articles: data.articles,
        ...ownProps,
    }),
})(ArticlesStream)