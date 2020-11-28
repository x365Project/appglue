import React from "react"
import PropTypes from "prop-types"
import { Media } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import images from "assets/images"

const Reviews = ({ comments }) => {
  return (
    <div className="mt-5">
      <h5 className="mb-4">Reviews :</h5>
      {map(comments, (comment, k) => (
        <Media
          className={comment.id === 1 ? "border-bottom" : "border-bottom mt-3"}
          key={"__media__" + k}
        >
          {comment.img !== "Null" ? (
            <img
              src={images[comment.img]}
              className="avatar-xs mr-3 rounded-circle"
              alt="img"
            />
          ) : (
            <div className="avatar-xs mr-3">
              <span className="avatar-title bg-soft-primary text-primary rounded-circle font-size-16">
                N
              </span>
            </div>
          )}
          <Media body>
            <h5 className="mt-0 mb-1 font-size-15">{comment.name}</h5>
            <p className="text-muted">{comment.description}</p>
            <ul className="list-inline float-sm-right">
              <li className="list-inline-item">
                <Link to="#">
                  <i className="far fa-thumbs-up mr-1" /> Like
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="far fa-comment-dots mr-1" /> Comment
                </Link>
              </li>
            </ul>
            <div className="text-muted font-size-12">
              <i className="far fa-calendar-alt text-primary mr-1" />
              {comment.date}
            </div>
            {comment.childComment
              ? comment.childComment.map((child, key) => (
                  <Media className="mt-4" key={"_media_" + key}>
                    <img
                      src={images[child.img]}
                      className="avatar-xs mr-3 rounded-circle"
                      alt="img"
                    />
                    <Media body>
                      <h5 className="mt-0 mb-1 font-size-15">{child.name}</h5>
                      <p className="text-muted">{child.description}</p>
                      <ul className="list-inline float-sm-right">
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="far fa-thumbs-up mr-1" /> Like
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="far fa-comment-dots mr-1" /> Comment
                          </Link>
                        </li>
                      </ul>
                      <div className="text-muted font-size-12">
                        <i className="far fa-calendar-alt text-primary mr-1" />{" "}
                        {child.date}
                      </div>
                    </Media>
                  </Media>
                ))
              : null}
          </Media>
        </Media>
      ))}
    </div>
  )
}

Reviews.propTypes = {
  comments: PropTypes.array,
}

export default Reviews
