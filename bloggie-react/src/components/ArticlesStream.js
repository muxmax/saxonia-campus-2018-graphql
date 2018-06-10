import React from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {Link} from "react-router-dom";

const ArticlePreview = ({id, title, authors, releaseDate, teaser}) => {
    return (
        <div style={{
            marginBottom: 50,
            padding: 20,
            backgroundColor: '#e5e6f5',
            borderColor: '#b4b5c4',
            borderWidth: 2
        }}>
          <Link to={`/articles/${id}`}><h3>{title}</h3></Link>
            <p>
                {authors[0].name} ({releaseDate.split("T")[0]}): <i>{teaser}</i>
            </p>
        </div>
    )
}

const ArticlesStream = ({loading, articles, error}) => {
    if (loading) {
        return <p>Loading ...</p>
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>
    }

    return (
        <div style={{paddingLeft: 300, paddingRight: 300, paddingTop: 50}}>
            {articles.map((a, key) => <ArticlePreview key={key} {...a}/>)}
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