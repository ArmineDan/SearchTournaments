import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import AlertDialogSlide from "../dialogBox";
import { hideList } from "../../animation";

import "./UserChoiceList.scss";

const cookie = new Cookies();
const UserChoiceList = ({ userCheckList, removeItem, updateCookie }) => {
  const [list, setList] = useState([]);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);

  const openDialogBox = (p, e) => {
    setId(e);
    setShow(p);
  };

  const remove = idd => {
    if (userCheckList.length === 1) {
      hideList(removeItem, 0);
      cookie.remove("savedList", { path: "/" });
    } else {
      removeItem(idd);
      updateCookie(userCheckList);
      cookie.remove("savedList", { path: "/" });
      cookie.set("savedList", userCheckList, {
        path: "/",
        expires: new Date(Date.now() + 2592000)
      });
    }
  };
  const closeDialogBox = (p, c) => {
    setShow(p);
    if (c) {
      remove(id);
    }
  };

  useEffect(() => {
    setList(userCheckList);
  }, [userCheckList, show, id]);
  return (
    <>
      <div className="check-list">
        <div className="check-list-title">
          {!userCheckList.length ? "No Tournaments" : "Saved Tournaments"}
        </div>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={index}>
                {" " + item[0].title}
                <Icon
                  id={item[0].id}
                  className="pointer"
                  color="error"
                  fontSize="small"
                  onClick={e => {
                    e.stopPropagation();
                    openDialogBox(true, e.target.id);
                  }}
                >
                  clear
                </Icon>
              </li>
            );
          })}
        </ul>
      </div>
      <AlertDialogSlide isOpen={show} closeDialogBox={closeDialogBox} />
    </>
  );
};

UserChoiceList.propTypes = {
  userCheckList: PropTypes.arrayOf(PropTypes.array),
  removeItem: PropTypes.func,
  updateCookie: PropTypes.func,
};

const mapStateToProps = store => ({
  userCheckList: store.userCheckList
});

const mapDispatchToProps = dispatch => ({
  removeItem: item => dispatch({ type: "DELETE_ITEM", payload: item }),
  updateCookie: result => dispatch({ type: "SET_COOKIE", payload: result })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChoiceList);
