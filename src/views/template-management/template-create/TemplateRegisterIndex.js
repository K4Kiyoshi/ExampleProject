/**
 * Template Registration Main Form
 * @author yaminzaw
 * @create 17/06/2022
 */
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../../common/Loading";
import TemplateCreateForm from "./TemplateCreateForm";
import TemplateCreateModal from "./TemplateCreateModal";
import CommonMessage from "../../common/CommonMessage";
import {
  checkNullOrBlank,
  validationWhiteSpace,
} from "../../common/CommonValidation";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import TemplateChooseModal from "./TemplateChooseModal";
import { ApiRequest } from "../../common/ApiRequest";
import moment from "moment";
import Moment from "moment";
import { useTranslation } from "react-i18next";
import ApiPath from "../../common/ApiPath";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";

const TemplateRegisterIndex = () => {
  const { t } = useTranslation();
  let customer_name = window.location.href.split("/")[3];
  const [error, setError] = useState([]); //for error message for template create modal
  const [subErrorField, setSubErrorField] = useState([]); //for error message for template create modal of add field
  const [levelNumError, setLevelNumErr] = useState([]); //for error message for template create modal of add field
  const [commentError, setCommentError] = useState([]);//for error message for template create modal of comment
  const [success, setSuccess] = useState([]); //for success message
  const [mainErr, setMainErr] = useState([]); //for main error of template create form
  const [loading, setLoading] = useState(false); // For Loading
  const [title, setTitle] = useState(""); //for template title
  const [showTemplateCreateModal, setShowTemplateCreateModal] = useState(false); //for show template create modal
  const [checked, setChecked] = useState(false); //for check is require field or not
  const [label, setLabel] = useState(""); //for get label from label input field
  const [selectField, setSelectField] = useState([]); //for select field
  const [selectJobCategory, setSelectJobCategory] = useState([]);
  const [selectCategoryValue, setSelectCategoryValue] = useState(""); //for get value of selected type
  const [selectPositionValue, setSelectPositionValue] = useState(""); //for get value of selected position
  const [selectPosition, setSelectPosition] = useState([]);
  const [levelRadio, setLevelRadio] = useState([
    { id: 0, name: "None" },
    { id: 1, name: "A-Z" },
    { id: 2, name: "1~10" },
    { id: 3, name: "Beginner, Intermediate, Advanced" },
    { id: 4, name: "N1~N5" },
  ]); //for choose level of multiple choice
  const [selectTypeValue, setSelectTypeValue] = useState(""); //for get value of selected type
  const [data, setData] = useState([]); //for store created data(headings array from api)
  const [multiChooseField, setMultiChooseField] = useState([]); //for add more field(dataList,multiple choice,single choice)
  const [subLabel, setSubLabel] = useState([]); //for sub label of (datalist,multiple choice,single choice)
  const [requireFlag, setRequireFlag] = useState(2); //for require flag(true=1,false=2)
  const [levelId, setLevelId] = useState(""); //for level id(multiple choice)
  const [selectNumber, setSelectNumber] = useState(""); //for get number besides check box of radio
  const [comment, setComment] = useState("");//for comment
  const [showCharacter, setShowCharacter] = useState(false); //for show input field of character (A_Z)
  const [showNum, setShowNum] = useState(false); //for show input field of number (1-infinity)
  const [levelData, setLevelData] = useState([]); //for level data
  const [editStatus, setEditStatus] = useState(false); //for edit status
  const [index, setIndex] = useState(""); //for edit index
  const [comfirmDeleteData, setComfirmDeleteData] = useState(""); //for delete data comfirm
  const [showChooseTemplateModal, setShowChooseTemplateModal] = useState(false); //for show template choose modal
  const [showApplyBtn, setShowApplyBtn] = useState(false); //for show apply btn
  const [imgId, setImgId] = useState(""); //for template image id
  const [diffImgOne, setDiffImgOne] = useState(false); //for show different choose image one
  const [diffImgTwo, setDiffImgTwo] = useState(false); //for show different choose image one
  const [diffImgThree, setDiffImgThree] = useState(false); //for show different choose image one
  const [mainImgOne, setMainImgOne] = useState(true); //for show main template image one
  const [mainImgTwo, setMainImgTwo] = useState(true); //for show main template image two
  const [mainImgThree, setMainImgThree] = useState(true); //for show main template image three
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [layoutId, setLayoutId] = useState(""); //for tempory id for template choose
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [templateUpId, setTemplateUpId] = useState(""); //for template id(edit/update)
  const [headingId, setHeadingId] = useState([]); //for heading id(edit/update)
  const [formTitle, setFormTitle] = useState(""); //for form title
  const [checkHeaderUpdate, setCheckHeaderUpdate] = useState(""); //for check duplicate header in update
  const [selectModalOpenDate, setSelectModalOpenDate] = useState("");//for job start date
  const [selectModalEndDate, setSelectModalEndDate] = useState("");//for job end date
  const [idUpdate, setIdUpdate] = useState(""); //for update layout id
  const [itemList, setItemList] = useState([]); //for item list to drag and drop
  const [dataId, setDataId] = useState(0); //data id
  const [addMoreData, setAddMoreData] = useState([]);
  const [countState, setCountState] = useState([]);//for count array state
  const [loginId, setLoginId] = useState(localStorage.getItem(`${customer_name}_LOGIN_ID`))
  const [loginPermission, setLoginPermission] = useState([]);//for store login permission
  const [essentialData, setEssentialData] = useState([]); // for show essential data
  let tempHead = []; //for tempory heading_id array
  let errArry = []; //for store error
  let levelErr = []; //for level error array of mutiple choice
  let commentErr = [];//for comment error

  /**
   * useEffect to get types and edit data from template list
   * @author yaminzaw
   * @create 27/06/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    (async () => {
      setLoading(true);
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
      }
      let permit = await specificPermission("Template Create", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await getType();
      await allJobFormLoad();
      setLoading(false);
    })();
    let templateEditData = JSON.parse(localStorage.getItem(`${customer_name}_TEMPLATE_EDIT_DATA`));
    systemFormLoadEdit(templateEditData);
    localStorage.removeItem(`${customer_name}_TEMPLATE_EDIT_DATA`); //clear section
  }, []);

  /**
   * edit function(get edit data from template list)
   * @author yaminzaw
   * @create 27/06/2022
   * @param id(from edit button click of template list)
   */
  const systemFormLoadEdit = (data) => {
    let essData = []; let resData = [];
    if (data == null) {
      setUpdateStatus(false);
      setFormTitle("Create New Resume Template");
      essentialFields();
    } else {
      setUpdateStatus(true);
      setFormTitle("Update Resume Template");
      setTitle(data.resume_title);
      setSelectModalOpenDate(data.job_open_date);
      setSelectModalEndDate(data.job_close_date);
      setTemplateUpId(data.template_job_position_id);
      setLayoutId(data.layout_id);
      setData(data.template_element_labels);

      let essArr = data.template_element_labels;
      essArr.forEach((data, i) => {
        essData.push(data)
        if (i % 2 != 0) {
          resData.push(essData)
          essData = [];
        }
      })
      setEssentialData(resData)

      data.template_element_labels.map((head, idx) => {
        tempHead.push(head.template_element_label_id);
      });
      setHeadingId(tempHead);
      setSelectCategoryValue(data.category_id);
      jobChangePositionShow(data.category_id);
      setSelectPositionValue(data.job_position_id);
      let count_arr = [];
      data.template_element_labels.map((tmp) => {
        if (tmp.virtual_column == 7 || tmp.virtual_column == 8 || tmp.virtual_column == 9) {
          count_arr.push(tmp);
        }
        return tmp;
      })
      setCountState(count_arr)
    }
  };

  /**
   * get type from api
   * @author yaminzaw
   * @create 17/06/2022
   */
  const getType = async () => {
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateCreateType,
      params: { login_id: loginId },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setSelectField(response.data.data);
      } else {
        setMainErr([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  /**
   * category formload from API
   * @author yaminzaw
   * @create 06/10/2022
   */
  let allJobFormLoad = async () => {
    setError([]);
    let job_form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobCategoryAll,
      params: {
        login_id: loginId,
      },
    };
    let response = await ApiRequest(job_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setSelectJobCategory(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   * @create 27/09/2022
   * @param e
   */
  const selectCategoryOnChange = (e) => {
    setError([]);
    setSelectCategoryValue(e.target.value);
    jobChangePositionShow(e.target.value);
  };

  /**
   * position formload from API
   * @author yaminzaw
   * @create 06/10/2022
   */
  let jobChangePositionShow = async (id) => {
    setError([]);
    setLoading(true);
    let pos_form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.AppliedJobPositionListIndexGetPosition,
      params: {
        login_id: loginId,
        job_category_id: id,
      },
    };
    let response = await ApiRequest(pos_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setSelectPosition([]);
    } else {
      if (response.data.status === "OK") {
        setSelectPosition(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }

    setLoading(false);
  };

  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   * @create 28/09/2022
   * @param e
   */
  const selectPositionOnChange = (e) => {
    setError([]);
    setSelectPositionValue(e.target.value);
  };

  /**
   * get essential fields from api
   * @author yaminzaw
   * @create 06/10/2022
   */
  let essentialFields = async () => {
    setError([]); let essData = []; let resData = [];
    //setSuccess([]);
    setLoading(true);
    let essential = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateCrateEssentialFields,
      params: {
        login_id: loginId,
      },
    };
    let response = await ApiRequest(essential);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {

        let essArr = response.data.data;
        essArr.forEach((data, i) => {
          essData.push(data)
          if (i % 2 != 0) {
            resData.push(essData)
            essData = [];
          }
        })
        setEssentialData(resData)
        setData(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    setLoading(false);
  };

  /**
   * get template title from input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeTitle = (e) => {
    setSuccess([]);
    setTitle(validationWhiteSpace(e.target.value));
  };

  /**
   * click function on add more information button and then show template create modal
   * @author yaminzaw
   * @create 17/06/2022
   */
  const addMoreInfoClick = () => {
    setError([]);
    setMainErr([]);
    setSuccess([]);
    setShowTemplateCreateModal(true);
    setChecked(true);
    setRequireFlag(2);
    setSelectNumber("");
    setComment("");
    setComment("");
    setLevelId("");
    setEditStatus(false);
    setLabel("");
    setSelectTypeValue("");
    setSubLabel([]);
    setShowNum(false);
    setShowCharacter(false);
    setSubErrorField([]);
  };

  /**
   * click function on close function of template create modal box
   * @author yaminzaw
   * @create 17/06/2022
   */
  const templateCreateModalCloseBtn = () => {
    setShowTemplateCreateModal(false);
  };

  /**
   * check function on check box of is require field( to show user require field or not)
   * @author yaminzaw
   * @create 17/06/2022
   */
  const checkRequire = () => {
    setChecked(!checked);
    if (checked == false) {
      setRequireFlag(2);
    } else if (checked == true) {
      setRequireFlag(1);
    }
  };

  /**
   * get label from input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeLabel = (e) => {
    setError([]);
    setLabel(validationWhiteSpace(e.target.value));
  };

  /**
   * get number from level input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSelectNumber(e.target.value);
    }
  };

  /**
  * get comment
  * @author yaminzaw
  * @create 08/11/2022
  * @param e
  */
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   * @create 20/06/2022
   * @param e
   */
  const selectTypeOnChange = (e) => {
    setError([]);
    setSelectNumber("");
    setComment("");
    setShowNum(false);
    setShowCharacter(false);
    setSubErrorField([]);
    let id = e.target.value;
    if (id == 1 || id == 3 || id == 2) {
      setMultiChooseField([{ id: 1, value: "" }]);
    }
    setSelectTypeValue(id);
    if ((id = 2)) {
      setLevelId(levelRadio[0].id);
    }
  };

  /**
   * click add field function
   * @author yaminzaw
   * @create 20/06/2022
   */
  const clickAddField = () => {
    setError([]);
    setSubErrorField([]);
    setMultiChooseField([
      ...multiChooseField,
      {
        id: multiChooseField[multiChooseField.length - 1]["id"] + 1,
        value: subLabel,
      },
    ]);
  };

  /**
   * onChange function of sublabel input field
   * @author yaminzaw
   * @create 20/06/2022
   * @param e,id
   */
  const subLabelChange = (e, id) => {
    multiChooseField.forEach((data) => {
      if (data.id == id) {
        data.value = validationWhiteSpace(e.target.value);
        setSubLabel([data.value]);
      }
    });
    setSubLabel([]);
  };

  /**
   * click minus img of sublabel field
   * @author yaminzaw
   * @create 20/06/2022
   * @param id
   */
  const deleteFieldClick = (id) => {
    setError([]);
    setSubErrorField([]);
    if (multiChooseField.length == 1) {
      errArry.push(t(CommonMessage.JSE031).replace("%s", t("This Template Field")));
      setError(errArry);
    } else {
      let data = multiChooseField.filter((d) => {
        return id != d.id;
      });
      setMultiChooseField(data);
    }
  };

  /**
   * onChange function on radio(level) of multiple choice
   * @author yaminzaw
   * @create 20/06/2022
   * @param data
   */
  const clickLevel = (data) => {
    setError([]);
    setSelectNumber("");
    setComment("");
    setShowCharacter(false);
    setShowNum(false);
    setLevelNumErr([]);
    setCommentError([]);
    setLevelId(data.id);
    if (data.id == 1) {
      setShowCharacter(true);
    } else if (data.id == 2) {
      setShowNum(true);
    }
  };

  /**
   * onClick delete button of created field from template card
   * @author yaminzaw
   * @create 21/06/2022
   * @param dataRemove
   */
  let remove = (dataRemove) => {
    setComfirmDeleteData(dataRemove);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t('Delete Confirmation')}</h5>`);
    setConfirmContent(`<p>${t('Are you sure want to delete?')}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
    setMainErr([]);
  };

  /**
   * onClick (Yes I delete it) function of delete button
   * @author yaminzaw
   * @create 21/06/2022
   */
  const deleteOK = () => {
    let dataArr = data.filter((d) => {
      return comfirmDeleteData != d;
    });
    if (comfirmDeleteData.essential_field_id == null) {
      addMoreData.pop();
    }
    if (updateStatus == false) {
      let itemArr = itemList.filter((i) => {
        return i != comfirmDeleteData.id;
      });
      setItemList(itemArr);
    }
    setData(dataArr);
    setConfirmShow(false);
  };

  /**
   * onClick edit button of created field from template card
   * @author yaminzaw
   * @create 21/06/2022
   * @param dataEdit
   */
  let edit = (dataEdit) => {
    let validateData = data.filter((d) => {
      return dataEdit != d;
    });
    setCheckHeaderUpdate(validateData);
    setChecked(false);
    setError([]);
    setMainErr([]);
    setMultiChooseField([]);
    setEditStatus(true);
    setShowTemplateCreateModal(true);
    setLevelNumErr([]);
    setCommentError([]);
    setShowNum(false);
    setShowCharacter(false);
    setSubErrorField([]);
    let levelDataArr = [];
    let selectNum;
    let sub = [];
    let arr_format = [];
    let tmpFlag;
    let i = data.indexOf(dataEdit);
    setIndex(i);
    setLabel(dataEdit.label_name);
    setSelectTypeValue(dataEdit.element_type_id);

    tmpFlag = dataEdit.require_flag;
    if (tmpFlag == 2) {
      setRequireFlag(2);
      setChecked(true);
    } else if (tmpFlag == 1) {
      setRequireFlag(1);
      setChecked(false);
    }

    if (dataEdit.element_type_id == 2) {
      setComment(dataEdit.level.level_comment)
      setLevelId(dataEdit.level.level_category_id);
      levelDataArr = dataEdit.level.level_data;
      if (dataEdit.level.level_category_id == 1) {
        setShowCharacter(true);
        selectNum = levelDataArr.length;
      } else if (dataEdit.level.level_category_id == 2) {
        setShowNum(true);
        selectNum = (levelDataArr.length + 1) / 2;
      }
      setSelectNumber(selectNum);

    }

    if (dataEdit.element_type_id == 1 || dataEdit.element_type_id == 2 || dataEdit.element_type_id == 3) {
      sub = dataEdit.input_data_name;
      sub.forEach((data, idx) => {
        arr_format.push({ id: idx + 1, value: data });
      });
      setMultiChooseField(arr_format);
    }
  };

  /**
   * common validation of duplicate check for all headers/attach file(type_id = 7)/profile image(type_id = 8)
   * @author yaminzaw
   * @create 14/07/2022
   * @param id
   */
  const checkDuplicateHeader = (data, id) => {
    data.map((d) => {
      if (d.label_name.toLowerCase().trim() == label.toLowerCase().trim()) {
        errArry.push(t(CommonMessage.JSE034).replace("%s", t("This Label")));
      }
    });
    if (id == 8) {
      data.map((d) => {
        if (d.element_type_id == id) {
          errArry.push(t(CommonMessage.JSE034).replace("%s", t("Profile Image")));
        }
      });
    } else if (id == 7) {
      data.map((d) => {
        if (d.element_type_id == id) {
          errArry.push(t(CommonMessage.JSE034).replace("%s", t("Attach File")));
        }
      });
    } else if (id == 9) {
      data.map((d) => {
        if (d.element_type_id == id) {
          errArry.push(t(CommonMessage.JSE034).replace("%s", t("Email Textbox")));
        }
      });
    }
  };

  /**
  * on click function of search to on/off
  * @author yaminzaw
  * @create 09/11/2022
  */
  const searchSwitch = (d) => {
    if (d.can_search == 1) {
      d.can_search = 2;
      d.search_by_limit = 2;
      d.virtual_column = null;
      countState.pop();
      setMainErr([]);
    } else if (countState.length > 2) {
      errArry.push(t(CommonMessage.JSE057));
      setMainErr(errArry)
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (d.can_search == 2) {
      d.can_search = 1;
      setCountState([...countState, d]);
      setMainErr([]);
    }
    setData([...data])
  }

  /**
  *  on click function of limit to on/off
  * @author yaminzaw
  * @create 09/11/2022
  */
  const limitSwitch = (d) => {
    if (d.search_by_limit == 1) {
      d.search_by_limit = 2;
    } else if (d.search_by_limit == 2) {
      d.search_by_limit = 1;
    }
    setData([...data])
  }

  /**
   * common function of add field and update field
   * @author yaminzaw
   * @create 21/06/2022
   * @param id
   */
  const commonAddUpdate = (id) => {
    setError([]);
    let subHeading = [];
    let levelDataArr = [];
    let subErrArray = [];
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    multiChooseField.forEach((data) => {
      subHeading.push(data.value);
    });

    let cap_label = label;
    if (label == "") {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Template Field Label")));
    } else if (label.match(/^ *$/) !== null) {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Template Field Label")));
    } else if (label.length > 100) {
      errArry.push(t(CommonMessage.JSE033).replace("%s", t("Template Field Label")).replace("%s", t("100")));
    } else if (label.includes("phone") && selectTypeValue != 11) {
      errArry.push(t(CommonMessage.JSE045).replace("%s", t("Phone Number Textbox")));
    }

    if (editStatus == false) {
      checkDuplicateHeader(data, id);
    }
    if (editStatus == true) {
      checkDuplicateHeader(checkHeaderUpdate, id);
    }
    if (selectTypeValue == "") {
      errArry.push(t(CommonMessage.JSE019).replace("%s", t("Template Field Label Type")));
    }
    if (selectTypeValue == 1 || selectTypeValue == 2 || selectTypeValue == 3) {
      if (multiChooseField.length > 0) {
        multiChooseField.forEach((data, idx) => {
          if (data.value == "" || data.value.length == 0) {
            subErrArray.push({
              id: data.id,
              value: t(CommonMessage.JSE005).replace("%s", t("Add Field Label")),
            });
          } else if (data.value.match(/^ *$/) !== null) {
            subErrArray.push({
              id: data.id,
              value: t(CommonMessage.JSE005).replace("%s", t("Add Field Label")),
            });
          } else if (data.value.length > 100) {
            subErrArray.push({
              id: data.id,
              value: t(CommonMessage.JSE033).replace("%s", t("Add Field Label")).replace("%s", t("100"))
            });
          } else if (data.value != "" || data.value.length > 0) {
            for (let j = 0; j < multiChooseField.length; j++) {
              if (idx !== j) {
                if (
                  multiChooseField[idx].value.toString().toUpperCase().trim() ==
                  multiChooseField[j].value.toString().toUpperCase().trim()
                ) {
                  subErrArray.push({
                    id: data.id,
                    value: t(CommonMessage.JSE032).replace("%s", t("Add Field Label"))
                  });
                  break;
                }
              }
            }
          }
        });
      }
    }
    if (selectTypeValue == 2) {
      if ((levelId == 1 || levelId == 2) && !checkNullOrBlank(selectNumber)) {
        levelErr.push(t(CommonMessage.JSE005).replace("%s", t("number")));
      } else if (levelId == 1 && (selectNumber <= 0 || selectNumber > 26)) {
        levelErr.push(t(CommonMessage.JSE030).replace("%s", "1").replace("%s", t("26")));
      } else if (levelId == 2 && (selectNumber <= 0 || selectNumber > 10)) {
        levelErr.push(t(CommonMessage.JSE030).replace("%s", "1").replace("%s", t("10")));
      }

      if ((levelId == 1 || levelId == 2 || levelId == 4) && (comment != null && comment != "")) {
        if(comment.length > 50){
          commentErr.push(t(CommonMessage.JSE033).replace("%s", t("Level Comment")).replace("%s", t("50")));
        }
      }
    }
    if (selectTypeValue == 2) {
      if (levelId == 2) {
        for (let i = 1.0; i <= selectNumber; i += 0.5) {
          levelDataArr.push(i);
          setLevelData(levelDataArr);
        }
      } else if (levelId == 1) {
        for (let i = 0; i < selectNumber; i++) {
          levelDataArr.push(alphabet[i]);
        }
        setLevelData(levelDataArr);
      } else if (levelId == 3) {
        levelDataArr.push("Beginner", "Intermediate", "Advanced");
        setLevelData(levelDataArr);
      } else if (levelId == 4) {
        levelDataArr.push("N1", "N2", "N3", "N4", "N5");
        setLevelData(levelDataArr);
      } else if (levelId == 0) {
        setLevelData(levelDataArr);
      }
    }
    if (editStatus == false) {
      if (errArry.length > 0 || subErrArray.length > 0 || levelErr.length > 0 || commentErr.length > 0) {
        setError(errArry);
        setSubErrorField(subErrArray);
        setLevelNumErr(levelErr);
        setCommentError(commentErr)
      } else {
        setSubErrorField([]);
        setAddMoreData([...addMoreData, addMoreData]);
        if (id == 1) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 2) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: { level_category_id: levelId, level_data: levelDataArr, level_comment: comment }, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 3) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 4) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 5) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 6) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 7) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 8) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        } else if (id == 9 || id == 10 || id == 11 || id == 12) {
          setData([...data, { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: 2, search_by_limit: 2, virtual_column: null }]);
        }
        setShowTemplateCreateModal(false);
        setDataId(dataId + 1);
      }
    }
    if (editStatus == true) {
      if (errArry.length > 0 || subErrArray.length > 0 || levelErr.length > 0 || commentErr.length > 0) {
        setError(errArry);
        setSubErrorField(subErrArray);
        setLevelNumErr(levelErr);
        setCommentError(commentErr)
      } else {
        setSubErrorField([]);
        let tmp = data;
        for (let i = 0; i <= tmp.length; i++) {
          if (i == index) {
            if (id == 1) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 2) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: { level_category_id: levelId, level_data: levelDataArr, level_comment: comment }, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: { level_category_id: levelId, level_data: levelDataArr, level_comment: comment }, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 3) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: subHeading, level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 4) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 9 || id == 10 || id == 11 || id == 12) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            }
            else if (id == 5) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 6) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 7) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            } else if (id == 8) {
              if (updateStatus == true) {
                tmp[index] = { template_element_label_id: headingId[i], label_name: cap_label, element_type_id: id, require_flag: requireFlag, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              } else {
                tmp[index] = { label_name: cap_label, element_type_id: id, require_flag: requireFlag, input_data_name: [], level: {}, essential_field_id: null, can_search: tmp[index].can_search, search_by_limit: tmp[index].search_by_limit, virtual_column: null };
              }
            }
          }
        }
        setShowTemplateCreateModal(false);
      }
    }
    if (editStatus == false && errArry.length == 0 && subErrArray.length == 0 && levelErr.length == 0) {
      setItemList([...itemList, (dataId + 1).toString()]);
    }
  };

  /**
   * click done button
   * @author yaminzaw
   * @create 23/06/2022
   */
  const doneClick = () => {
    setSuccess([]);
    setMainErr([]);
    let mainErr = [];

    if (!checkNullOrBlank(title)) {
      mainErr.push(t(CommonMessage.JSE005).replace("%s", t("Resume Title")));
    } else if (title.match(/^ *$/) !== null) {
      mainErr.push(t(CommonMessage.JSE005).replace("%s", t("Resume Title")));
    } else if (title.length > 100) {
      mainErr.push(t(CommonMessage.JSE033).replace("%s", t("Resume Title")).replace("%s", t("100")));
    }
    if (!checkNullOrBlank(selectCategoryValue)) {
      mainErr.push(t(CommonMessage.JSE019).replace("%s", t("Job Category")));
    }
    if (!checkNullOrBlank(selectPositionValue)) {
      mainErr.push(t(CommonMessage.JSE019).replace("%s", t("Position")));
    }
    if ((selectModalOpenDate == "" || selectModalOpenDate == null) && (selectModalEndDate != "" && selectModalEndDate != null)) {
      mainErr.push(t(CommonMessage.JSE001).replace("%s", t("Job Open Date")));
    }
    if ((selectModalEndDate == "" || selectModalEndDate == null) && (selectModalOpenDate != "" && selectModalOpenDate != null)) {
      mainErr.push(t(CommonMessage.JSE001).replace("%s", t("Job Close Date")));
    }
    if (mainErr.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setMainErr(mainErr);
    } else {
      let tmp = 7;
      let res = data.map((d) => {
        if (d.can_search == 1 && d.essential_field_id == null) {
          d.virtual_column = tmp++;
        } else if (d.can_search == 2 && d.essential_field_id == null) {
          d.virtual_column = null;
        }
        return d;
      })
      setData(res);
      setShowChooseTemplateModal(true);
      setDiffImgOne(false);
      setDiffImgTwo(false);
      setDiffImgThree(false);
      setShowApplyBtn(false);
      setMainImgOne(true);
      setMainImgTwo(true);
      setMainImgThree(true);
      if (updateStatus == true) {
        if (layoutId == 1) {
          imgClick(1);
          setDiffImgOne(true);
          setMainImgOne(false);
          setMainImgTwo(true);
          setMainImgThree(true);
        } else if (layoutId == 2) {
          imgClick(2);
          setDiffImgTwo(true);
          setMainImgTwo(false);
          setMainImgOne(true);
          setMainImgThree(true);
        } else if (layoutId == 3) {
          imgClick(3);
          setDiffImgThree(true);
          setMainImgThree(false);
          setMainImgOne(true);
          setMainImgTwo(true);
        }
      }
    }
  };

  /**
   * click image among 3 image of template sample
   * @author yaminzaw
   * @create 23/06/2022
   * @param id
   */
  const imgClick = (id) => {
    setDiffImgOne(false);
    setDiffImgTwo(false);
    setDiffImgThree(false);
    if (id == 1) {
      setDiffImgOne(true);
      setMainImgOne(false);
      setMainImgTwo(true);
      setMainImgThree(true);
    } else if (id == 2) {
      setDiffImgTwo(true);
      setMainImgTwo(false);
      setMainImgOne(true);
      setMainImgThree(true);
    } else if (id == 3) {
      setDiffImgThree(true);
      setMainImgThree(false);
      setMainImgOne(true);
      setMainImgTwo(true);
    }
    setImgId(id);
    setShowApplyBtn(true);
  };

  /**
   * click apply button below image
   * @author yaminzaw
   * @create 23/06/2022
   * @param id
   */
  const applyClick = (id) => {
    setShowChooseTemplateModal(false);

    if (updateStatus) {
      setIdUpdate(id);
      setConfirmShow(true);
      setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Update Confirmation')}</h5>`);
      setConfirmContent(`<p>${t('Are you sure want to update?')}</p>`);
      setConfirmType("update");
      setContentOk(t("Yes"));
    } else if (!updateStatus) {
      setLayoutId(id);
      setConfirmShow(true);
      setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Create Confirmation')}</h5>`);
      setConfirmContent(`<p>${t('Are you sure want to create?')}</p>`);
      setConfirmType("save");
      setContentOk(t("Yes"));
    }
  };


  /**
   * onClick (Ok) function of Yes button to create template
   * @author yaminzaw
   * @create 21/06/2022
   */
  const saveOK = async () => {
    setLoading(true);
    setConfirmShow(false);

    let format_start;
    let format_end;

    if (selectModalOpenDate == null || selectModalOpenDate == "") {
      format_start = null;
    } else {
      format_start = Moment(selectModalOpenDate).format("YYYY-MM-DD")
    }
    if (selectModalEndDate == null || selectModalEndDate == "") {
      format_end = null;
    } else {
      format_end = Moment(selectModalEndDate).format("YYYY-MM-DD");
    }

    let saveTemplate = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.TemplateCreateSave,
      params: {
        login_id: loginId,
        resume_title: title,
        job_open_date: format_start,
        job_close_date: format_end,
        template_element_labels: data,
        layout_id: layoutId,
        job_position_id: selectPositionValue,
        customer_name: customer_name
      },
    };
    let response = await ApiRequest(saveTemplate);
    if (response.flag === false) {
      setMainErr(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        setData([]);
        setTitle([]);
        setSelectModalOpenDate("");
        setSelectModalEndDate("");
        setSelectCategoryValue("");
        setSelectPositionValue("");
        essentialFields();
        setCountState([]);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setMainErr([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  /**
   * onClick (Ok) function of Yes button to update template
   * @author yaminzaw
   * @create 27/06/2022
   */
  const updateOK = async () => {
    setLoading(true);
    setConfirmShow(false);

    let format_start;
    let format_end;

    if (selectModalOpenDate == null || selectModalOpenDate == "") {
      format_start = null;
    } else {
      format_start = Moment(selectModalOpenDate).format("YYYY-MM-DD")
    }
    if (selectModalEndDate == null || selectModalEndDate == "") {
      format_end = null;
    } else {
      format_end = Moment(selectModalEndDate).format("YYYY-MM-DD");
    }

    let updateTemplate = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.TemplateCreateUpdate,
      params: {
        login_id: loginId,
        template_job_position_id: templateUpId,
        resume_title: title,
        template_element_labels: data,
        layout_id: idUpdate,
        job_open_date: format_start,
        job_close_date: format_end,
      },
    };
    let response = await ApiRequest(updateTemplate);
    if (response.flag === false) {
      setMainErr(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        setData([]);
        setTitle([]);
        setSelectModalOpenDate("");
        setSelectModalEndDate("");
        setSelectCategoryValue("");
        setSelectPositionValue("");
        setUpdateStatus(false);
        essentialFields();
        setCountState([]);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setMainErr([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Loading start={loading} />
      <TemplateCreateForm
        handleChangeTitle={handleChangeTitle}
        title={title}
        addMoreInfoClick={addMoreInfoClick}
        data={data}
        essentialData={essentialData}
        remove={remove}
        edit={edit}
        doneClick={doneClick}
        error={mainErr}
        success={success}
        formTitle={formTitle}
        itemList={itemList}
        setItemList={setItemList}
        updateStatus={updateStatus}
        selectJobCategory={selectJobCategory}
        selectCategoryOnChange={selectCategoryOnChange}
        selectCategoryValue={selectCategoryValue}
        addMoreData={addMoreData}
        selectPosition={selectPosition}
        selectPositionOnChange={selectPositionOnChange}
        selectPositionValue={selectPositionValue}
        searchSwitch={searchSwitch}
        limitSwitch={limitSwitch}
        selectModalEndDate={selectModalEndDate}
        selectModalOpenDate={selectModalOpenDate}
        setSelectModalEndDate={setSelectModalEndDate}
        setSelectModalOpenDate={setSelectModalOpenDate}
        loginPermission={loginPermission}
      />
      <TemplateCreateModal
        show={showTemplateCreateModal}
        templateCreateModalCloseBtn={templateCreateModalCloseBtn}
        checked={checked}
        checkRequire={checkRequire}
        handleChangeLabel={handleChangeLabel}
        label={label}
        selectField={selectField}
        selectTypeOnChange={selectTypeOnChange}
        selectTypeValue={selectTypeValue}
        error={error}
        clickAddField={clickAddField}
        multiChooseField={multiChooseField}
        subLabelChange={subLabelChange}
        deleteFieldClick={deleteFieldClick}
        levelRadio={levelRadio}
        clickLevel={clickLevel}
        levelId={levelId}
        selectNumber={selectNumber}
        handleChangeNumber={handleChangeNumber}
        handleChangeComment={handleChangeComment}
        comment={comment}
        showCharacter={showCharacter}
        showNum={showNum}
        editStatus={editStatus}
        commonAddUpdate={commonAddUpdate}
        subError={subErrorField}
        levelNumError={levelNumError}
        commentError={commentError}
      />
      <ResumeConfirmMessage
        show={confirmShow}
        type={confirmType}
        header={confirmHeader}
        content={confirmContent}
        cancel={() => setConfirmShow(false)}
        deleteOK={deleteOK}
        saveOK={saveOK}
        updateOK={updateOK}
        okButton={contentOK}
        cancelButton={t("Cancel")}
      />
      <TemplateChooseModal
        show={showChooseTemplateModal}
        applyClick={applyClick}
        imgClick={imgClick}
        showApplyBtn={showApplyBtn}
        imgId={imgId}
        diffImgOne={diffImgOne}
        diffImgTwo={diffImgTwo}
        diffImgThree={diffImgThree}
        mainImgOne={mainImgOne}
        mainImgTwo={mainImgTwo}
        mainImgThree={mainImgThree}
        cancel={() => {
          setShowChooseTemplateModal(false);
        }}
      />
    </>
  );
};
export default TemplateRegisterIndex;
