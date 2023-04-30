/**
 * Role and Permisiion Registration Index
 * @author yaminzaw
 */
import React, { useState, useEffect } from "react";
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CRow,
} from "@coreui/react";
import RolePermissionRegister from "./RolePermissionRegForm";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { ApiRequest } from "../../common/ApiRequest";
import { useHistory } from "react-router-dom";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";
import SuccessError from "../../common/SuccessError";

const RolePermissionRegisterIndex = () => {
	let history = useHistory(); //for useHistory
	const { t } = useTranslation();//for translation
	let customer_name = window.location.href.split("/")[3];
	const [error, setError] = useState([]);     // For Error Message
	const [success, setSuccess] = useState([]);     // For Success Message
	const [loading, setLoading] = useState(false);  // For Loading
	const [editID, setEditID] = useState(null);     // For Edit data
	const [okButton, setOkButton] = useState('');   // For Confirmation box
	const [type, setType] = useState('');   // For Confirmation box
	const [header, setHeader] = useState('');   // For Confirmation box
	const [content, setContent] = useState('');   // For Confirmation box  
	const [show, setShow] = useState(false);// For show/hide confirmation box
	const [userLevel, setUserLevel] = useState([]); // to show user level
	const [levelShow, setLevelShow] = useState(false); // for user level show or hide
	const [levelMain, setLevelMain] = useState(false); // for user level main check box
	const [process, setProcess] = useState([]); // for process
	const [company, setCompany] = useState(''); // to show company name
	const [btnName, setBtnName] = useState('Save')
	const [loginPermission, setLoginPermission] = useState([]);
	const [loginId, setLoginId] = useState(localStorage.getItem(`${customer_name}_LOGIN_ID`))

	useEffect(() => {
		document.body.style.overflow = "auto";
		(async () => {
			setLoading(true);
			let reload = JSON.parse(localStorage.getItem(`${customer_name}_EMPLOYEE_REG_RELOAD`)); // come from updated success
			localStorage.removeItem(`${customer_name}_EMPLOYEE_REG_RELOAD`);
			if (reload == true) {
				history.push(`/${customer_name}/recruit/role-management/role-&-permission-list`);
			} else {
				await PermissionCheck();
				let loginData = {
					login_id: loginId,
				}
				let permit = await specificPermission("Role & Permission Register", loginData);
				Promise.all([permit]).then((values) => {
					permit = values[0];
					setLoginPermission(permit);
				});
				await index();
				setLoading(false);
			}
		})();
	}, []);

	//index function to know edit or not
	const index = async () => {

		let edit_data = JSON.parse(localStorage.getItem(`${customer_name}_MENU_SETTING_EDIT_DATA`))

		if (edit_data !== null) {
			setEditID(edit_data);
			localStorage.removeItem(`${customer_name}_MENU_SETTING_EDIT_DATA`);
			await formload(edit_data);
		} else {
			await formload();
		}
	}

	//formload function ( for both initial or edit )
	const formload = async (id = null) => {
		setLoading(true);
		let params = {
			login_id: loginId,
			edit_role_id: id
		}

		let obj = {
			url: ApiPath.RolePermission,
			package_name: "recruit",
			method: 'get',
			params: params
		}
		let response = await ApiRequest(obj);
		if (response.flag === false) {
			setError(response.message);
		}
		else {
			let {
				permission,
				company,
				role,
			} = response.data;
			if (!id) {
				setProcess(permission);
				setUserLevel(role);
				setCompany(company);
				setLevelShow(false);
				setLevelMain(false);
			}
			else {
				obj.url = ApiPath.RolePermissionEdit

				let response = await ApiRequest(obj);

				if (response.flag === false) {
					setError(response.message)
				} else {
					let process = permission;
					let user_level = role;

					setBtnName("Update")

					let userLevel = user_level.filter(level => level.id === parseInt(id));

					userLevel.forEach(level => {
						level.is_checked = true;
					});

					setUserLevel(user_level);
					setLevelShow(true);
					setLevelMain(true);

					let checkedArr = []; // modified checked menu to change format
					let chk_menu = response.data.checked_menu;

					chk_menu.forEach(chk => {
						checkedArr.push(chk.name);
					});

					let result = []

					if (checkedArr.length > 0) {
						checkedArr.map(check => {
							result = process.map(menu => {
								if (menu.sub != undefined && menu.sub.length > 0) {
									menu.sub.map(Sub => {
										Sub.sub.forEach(subs => {
											if (subs.action_id === check) {
												subs.is_checked = true;
												Sub.sub_show = true;
												menu.show = true;
											}
										})
									})
								}
								return menu;
							})
							return check;
						});
					}

					if (result.length > 0) {
						result.map(res => {
							let cFlag = true
							if (res.sub != undefined) {
								res.sub.map(Sub => {
									let sFlag = true
									Sub.sub.forEach(subs => {
										if (subs.is_checked === false) sFlag = false
									})
									if (sFlag) Sub.is_checked = true
									if (Sub.is_checked === false) cFlag = false
								})
							}
							if (cFlag) res.is_checked = true
							return res
						})
					}

					setProcess(result)

					if (response.data.company != null && response.data.company != "") {
						setCompany(response.data.company);
					}
				}
			}
		}
		setLoading(false);
	}

	// for user level plus minus button to show or hide function
	let userLevelChange = () => {
		setLevelShow(!levelShow);
	}

	//for user level main check box show or hide function ( check main and then sub role are all checked)
	let userLevelMainChange = () => {
		setLevelMain(!levelMain);
		userLevel.forEach(user => {
			user.is_checked = !levelMain;
		})
	}

	//for user level sub check box show or hide function
	let userLevelSubChange = (e) => {
		let id = e.id;
		let flag = true;
		let level_data = userLevel.map(user =>
			user.id === parseInt(id) ? {
				...user,
				is_checked: !user.is_checked
			} : user
		);
		level_data.forEach(data => {
			if (data.is_checked === false) {
				flag = false;
			}
		})
		setLevelMain(flag);
		setUserLevel(level_data);
	}

	//for process first icon show or hide function
	let firstIcon = (e) => {
		let menu = e.main_menu;
		let process_data = process.map(process =>
			process.main_menu === menu ? {
				...process,
				show: !process.show
			}: process
		);
		setProcess(process_data);
	}

	//for process second icon show or hide function
	let secondIcon = (e) => {
		let firstID = e.target.getAttribute("value");
		let secondID = e.target.getAttribute("id");
		let process_data = process.map((first, index) => {
			if (index === parseInt(firstID)) {
				first.sub.map((second, ind) => {
					if (ind === parseInt(secondID)) {
						second.sub_show = !second.sub_show;
						return second;
					}
					return second
				})
			}
			return first
		});
		setProcess(process_data);
	}

	//for process first checkbox function
	let processFirst = (e) => {
		let menu = e['main_menu'];
		let flag = !e['is_checked'];

		let process_data = process.map(first => {
			if (first.main_menu === menu) {
				first.is_checked = flag;
				first.sub.map(second => {
					second.is_checked = flag;
					second.sub.map(third => {
						third.is_checked = flag;
					})
				})
			}
			return first
		});
		setProcess(process_data);
	}

	//for process second checkbox function
	let processSecond = (e) => {
		let firstID = parseInt(e.target.getAttribute("value"));
		let secondID = parseInt(e.target.getAttribute("data-ref"));
		let flag = !process[firstID].sub[secondID].is_checked;
		let firstFlag = true; // first checkbox default is_checked -> true
		let process_data = process.map((first, index) => {
			if (index === firstID) {
				first.sub.map((second, ind) => {
					if (ind === secondID) {
						second.is_checked = flag;
						second.sub.map(third => {
							third.is_checked = flag;
						})
					}
				})
			}
			return first
		});

		setProcess(process_data);
		process_data.map((first, index) => {
			if (index === firstID) {
				first.sub.map(second => {
					if (second.is_checked === false) {
						firstFlag = false;
					}
				})
			}
		});
		process_data[firstID].is_checked = firstFlag;
	}

	//for process third checkbox function
	let processThird = (e) => {
		let firstID = parseInt(e.target.getAttribute("value"));
		let secondID = parseInt(e.target.getAttribute("data-ref"));
		let thirdID = parseInt(e.target.getAttribute("name"));
		let flag = !process[firstID].sub[secondID].sub[thirdID].is_checked;
		let check_name = process[firstID].sub[secondID].sub[thirdID].action_name;
		let secondFlag = true; // second checkbox default is_checked -> true
		let firstFlag = true; // first checkbox default is_checked -> true
		let process_data = process.map((first, index) => {
			if (index === firstID) {
				first.sub.map((second, ind) => {
					if (ind === secondID) {
						let checkFlag = false
						second.sub.map((third, idx) => {
							if (idx === thirdID) {
								third.is_checked = flag;
							}
							if (third.action_name === "View" || third.is_checked === true) {
								third.is_checked = true
							}
							if (check_name === "View" && flag === false) {
								checkFlag = true
							}
						})
						if (checkFlag) {
							second.sub.map(third => {
								third.is_checked = false
							})
						}
					}
				})
			}
			return first
		});
		setProcess(process_data);

		if (process_data.length > 0) {
			process_data.map((first, index) => {
				if (index === firstID) {
					first.sub.map((second, ind) => {
						if (ind === secondID) {
							second.sub.map(third => {
								if (third.is_checked === false) {
									secondFlag = false;
								}
							})
						}
					})
				}
			});
		}

		process_data[firstID].sub[secondID].is_checked = secondFlag;

		if (process_data.length > 0) {
			process_data.map((first, index) => {
				if (index === firstID) {
					first.sub.map(second => {
						if (second.is_checked === false) {
							firstFlag = false;
						}
					})
				}
			});
		}

		process_data[firstID].is_checked = firstFlag;
	}

	//to save role and permission pair
	let save = () => {

		let error = t(CommonMessage.JSE001).replace('%s', t('User Level'));

		userLevel.forEach(user => {
			if (user.is_checked === true) {
				error = "";
			}
		});

		if (error !== "") {
			setError([error]);
			setSuccess("");
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} else {

			let error = t(CommonMessage.JSE001).replace('%s', t('Process'));

			process.forEach(process => {
				if (process.sub != undefined) {
					process.sub.forEach(sub => {
						sub.sub.forEach(subs => {
							if (subs.is_checked === true) {
								error = "";
							}
						})
					})
				}

			})

			if (error !== "") {
				setError([error]);
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			} else {
				setError([]); setSuccess([]);
				setShow(!show);
				setType('save');

				if (btnName === "Save") {
					setContent(`<p>${t('Are you sure want to save?')}</p>`);
					setHeader(`<h5 style='color:#4e57aa'>${t('Save Confirmation')}</h5>`);
					setOkButton(t('Save'));
				} else {
					setContent(`<p>${t('Are you sure want to update?')}</p>`);
					setHeader(`<h5 style='color:#4e57aa'>${t('Update Confirmation')}</h5>`);
					setOkButton(t('Update'));
				}
			}
		}
	}

	//saveOK function of role and permission register pair
	const saveOK = async () => {
		setShow(!show); setLoading(true);
		setType('');
		setContent('')
		setHeader('');
		setOkButton('');

		let choose_process = [];
		let choose_level = [];

		userLevel.forEach(user => {
			if (user.is_checked === true) {
				choose_level.push(user.id);
			}
		})

		process.forEach(process => {
			if (process.sub != undefined) {
				process.sub.forEach(sub => {
					sub.sub.forEach(subs => {
						if (subs.is_checked === true) {
							choose_process.push(subs.action_id);
						}
					})
				})
			}
		})

		let loginData = {
			login_id: loginId,
		}

		let saveData = {
			...loginData,
			choose_process: choose_process,
			choose_level: choose_level,
			edited_role_id: editID
		}

		let obj = {}

		if (!editID) { //save
			obj = {
				package_name: "recruit",
				method: 'post', url: ApiPath.RolePermission,
				params: saveData
			}
		} else { // update
			obj = {
				package_name: "recruit",
				method: 'put',
				url: ApiPath.RolePermissionEdit + editID,
				params: saveData
			}
		}

		let response = await ApiRequest(obj); setLoading(false);
		if (response.flag === false) {
			if (!editID) {
				setError(response.message); setSuccess("");
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			} else {
				let obj = response.message[0]
				localStorage.setItem(`${customer_name}_EDIT_USER_MENU_RETURN`, JSON.stringify(obj));
				history.push(`/${customer_name}/recruit/role-management/role-&-permission-list`);
			}
		} else {
			if (!editID) {
				setError([]);
				let suc = []; suc.push(response.data.message)
				setSuccess(suc);
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				formload();
				setTimeout(function () {
					window.location.reload();
				}, 3000);
			} else {
				let obj = response.data.message
				localStorage.setItem(`${customer_name}_EDIT_USER_MENU_RETURN`, JSON.stringify(obj));
				localStorage.setItem(
					`${customer_name}_EMPLOYEE_REG_RELOAD`,
					true
				);
				window.location.reload();

			}
		}
	}

	return (
		<>
			<Loading start={loading} />
			<SuccessError error={error} success={success} />
			<CRow>
				<CCol xs="12">
					<CCard
						style={{
							background: "#eff1fe",
							paddingBottom: "30px",
							borderRadius: "1rem",
							overflow: "hidden",
						}}
					>
						<CCardHeader style={{ background: "#eff1fe" }}>
							<CRow>
								<CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
								<CCol lg="11">
									<h3
										style={{
											color: "#373d77",
											marginTop: "15px",
											marginBottom: "20px",
										}}
									>
										{t("Role & Permission Register")}
									</h3>
								</CCol>
							</CRow>
						</CCardHeader>
						<CCardBody>
							<RolePermissionRegister
								userLevel={userLevel} levelShow={levelShow} userLevelChange={userLevelChange}
								userLevelMainChange={userLevelMainChange} userLevelSubChange={userLevelSubChange}
								levelMain={levelMain} firstIcon={firstIcon} processFirst={processFirst}
								secondIcon={secondIcon} company={company} processSecond={processSecond}
								processThird={processThird} save={save} processMain={process} btnName={btnName}
								loginPermission={loginPermission} editID={editID}
								success={success}
								error={error}
							/>
						</CCardBody>
					</CCard>
					<ResumeConfirmMessage
						show={show}
						type={type}
						header={header}
						content={content}
						cancel={() => setShow(!show)}
						okButton={okButton}
						cancelButton={t("Cancel")}
						saveOK={saveOK}
					/>
				</CCol>
			</CRow>
		</>
	)
}

export default RolePermissionRegisterIndex;

