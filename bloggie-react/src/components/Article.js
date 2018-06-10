import React from "react"
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import moment from "moment"

const ArticlePage = ({loading, error, article}) => {

  if (loading) {

    return (
        <ArticleLayoutBox>
          <p>Loading ...</p>
          <NavigateBack/>
        </ArticleLayoutBox>
    )

  } else if (error) {

    return (
        <ArticleLayoutBox>
          <p>{error}</p>
          <NavigateBack/>
        </ArticleLayoutBox>
    )

  } else {

    return (
        <ArticleLayoutBox>
          <ArticleContentBox article={article}/>
          <NavigateBack/>
        </ArticleLayoutBox>
    )
  }

}

const ArticleLayoutBox = ({children}) => (
    <div style={{paddingLeft: 300, paddingRight: 300, paddingTop: 50}}>
      {children}
    </div>
)

const ArticleContentBox = ({article}) => (
    <div style={{marginBottom: 50, padding: 30, backgroundColor: "#222", color: "#fff"}}>
      <p>{article.authors.map(a => a.name).join(", ")}: {article.title}</p>
      <hr/>
      <br/>
      <p>{article.text}</p>
      <p style={{
        marginBottom: 30,
        textAlign: "right"
      }}>
        <span style={{marginRight: 15}}>{moment(article.releaseDate).format("LLL")}</span>
        <Tags article={article}/>
      </p>
    </div>
)

const Tags = ({article}) => (
    article.tags
        .map((a, index) => (<span key={index} style={{
          padding: 5,
          marginRight: 10,
          border: "solid #fff 1px",
          borderRadius: 1
        }}>{a.name}</span>))
)

const NavigateBack = () => (
    <a href="/articles">
      <span style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: 5,
        borderRadius: 1
      }}>
        back
      </span>
    </a>
)

const articleQuery = gql`
  query article($id: ID!) {
    article(id: $id) {
      title
      releaseDate
      authors {
        name
      }
      tags {
        name
      }
      text
    }
  }
`

export default graphql(articleQuery, {
  options: props => ({
    variables: {
      id: props.match.params.articleId,
    }
  }),
  props: ({ownProps, data}) => ({
    ...ownProps,
    loading: data.loading,
    error: data.error,
    article: data.article,
  }),
})(ArticlePage)