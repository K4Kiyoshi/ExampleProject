/* Dashboard Index
 * @author Yuwa Ko Ko
 * @create 24/09/2022
 */
import Loading from "../common/Loading";
import React, { useState, useEffect } from "react";
import DashboardForm from "./DashboardForm";
import { useHistory } from "react-router-dom";
import { ApiRequest } from "../common/ApiRequest";
import Echo from "laravel-echo";
import ApiPath from "../common/ApiPath";
import { useTranslation } from "react-i18next";

const DashboardIndex = () => {
  const [series, setSeries] = useState([]); //for Apex chart data
  const [topData, setTopData] = useState([]); // for top display data
  const [barHeigh, setBarHeigh] = useState(0); // bar heigh to adjust the graph
  const [success, setSuccess] = useState([]); // bar heigh to adjust the graph
  const [error, setError] = useState([]); // bar heigh to adjust the graph
  const [loading, setLoading] = useState(false); // For Loading
  const [notiData, setNotiData] = useState([]); // for socket data
  let customer_name = window.location.href.split("/")[3]; // for customer name

  let history = useHistory(); //for history.push
  let nameData = []; // name Data array
  let nameDataCount = []; // applicant count array

  //category_name & position_name map and push to array
  topData.map((data) => {
    nameData.push(`${data.category_name}(${data.position_name})`);
  });
  topData.map((data) => {
    nameDataCount.push(parseInt(data.category_count));
  });

  //for display chart
  const options = {
    chart: {
      type: "bar",
      height: 180,

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: "80%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: [
      "#775ea6",
      "#039daf",
      "#f86fa9",
      "#ab66ff",
      "#a1b7c4",
      "#67d3fe",
      "#9ca9c9",
      "#f86fea",
      "#666cff",
      "#fca769",
      "#85e099",
      "#b3af5b",
    ],
    dataLabels: {
      enabled: true,
      textAnchor: "top",
      style: {
        colors: ["balck"],
      },
      formatter: function (val) {
        return val;
      },
      offsetX: 1000,
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: nameData,
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: ["black"],
          fontSize: [13],
          fontWeight: ["100px"],
        },
      },
    },
    tooltip: {
      theme: "light",
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  //useEffect function
  useEffect(() => {
    localStorage.removeItem(`${customer_name}_SHOW_ARRAY`);
    const token = localStorage.getItem(`${customer_name}_TOKEN`);
    const app_key = process.env.REACT_APP_PUSHER_APP_KEY;
    const app_cluster = process.env.REACT_APP_PUSHER_APP_CLUSTER;
    const ws_port = process.env.REACT_APP_WS_PORT;
    const tls = process.env.REACT_APP_FORCE_TLS === "true";
    const disable_stats = process.env.REACT_APP_DISABLE_STATS === "true";
    let auth_route;
    let channel_id;

    auth_route = `${process.env.REACT_APP_API_URL}/api/${customer_name}/websocket/auth`;
    channel_id = `tenant.${customer_name}.application.status.update`;
    let eventName = `.tenant.${customer_name}.application.status`;

    const ws_host = process.env.REACT_APP_WSHOST;
    const encrypted = process.env.REACT_APP_ENCRYPTED === "true";

    window.Pusher = require("pusher-js");
    window.Pusher.logToConsole =
      process.env.REACT_APP_LOG_TO_CONSOLE === "true";
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: app_key,
      cluster: app_cluster,
      wsHost: ws_host,
      wsPort: ws_port,
      wssPort: ws_port,
      encrypted: encrypted,
      enabledTransports: ["ws", "wss"],
      forceTLS: tls,
      disableStats: disable_stats,
      authEndpoint: auth_route,
      auth: {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      },
    });
    window.Echo.private(channel_id).listen(eventName, (notify) => {
      let temp = [
        {
          template_job_position_id: "",
          position_id: "",
          total_applicant: "",
          today_applicant: "",
          job_category_apply: "",
          job_category_codingtest: "",
          job_category_1st_interview: "",
          job_category_2nd_interview: "",
          job_category_3rd_interview: "",
          job_category_approvel: "",
          job_category_offerletter: "",
          job_category_accept_reject: "",
          job_category_onboard: "",
          total_cancel_reject: "",
        },
      ];
      temp.template_job_position_id = notify.template_job_position_id;
      temp.job_category_id = notify.job_category_id;
      temp.position_id = notify.position_id;
      temp.total_applicant = notify.total_applicant;
      temp.today_applicant = notify.today_applicant;
      temp.job_category_apply = notify.job_category_apply;
      temp.job_category_codingtest = notify.job_category_codingtest;
      temp.job_category_1st_interview = notify.job_category_1st_interview;
      temp.job_category_2nd_interview = notify.job_category_2nd_interview;
      temp.job_category_3rd_interview = notify.job_category_3rd_interview;
      temp.job_category_approvel = notify.job_category_approvel;
      temp.job_category_offerletter = notify.job_category_offerletter;
      temp.job_category_accept_reject = notify.job_category_accept_reject;
      temp.job_category_onboard = notify.job_category_onboard;
      temp.total_cancel_reject = notify.total_cancel_reject;
      setNotiData(temp);
    });
    document.body.style.overflow = "auto";
    (async () => {
      await getData();
    })();
  }, []);

  // to get data from websocket
  let getData = async () => {
    setError([]);
    setLoading(true);
    let job_form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.DashboardGetData,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
      },
    };
    let response = await ApiRequest(job_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setTopData(response.data.data);

        if (response.data.data.length == 1) {
          setBarHeigh(response.data.data.length * 120);
        } else if (response.data.data.length == 2) {
          setBarHeigh(response.data.data.length * 80);
        } else if (response.data.data.length == 3) {
          setBarHeigh(response.data.data.length * 70);
        } else {
          setBarHeigh(response.data.data.length * 65);
        }
        let arr = [];
        response.data.data.forEach((a) => {
          arr.push(a.total_applicant);
        });
        setSeries([
          {
            data: arr,
          },
        ]);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }

    setLoading(false);
  };

  //scroll function to go to same id
  let scroll = (modal_id) => {
    let element = document.getElementById(modal_id);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // for candidate card click function
  let candidateCard = (id) => {
    scroll(`card${id}`);
  };

  //Applied click link to go JobAppliedList form
  let appliedClick = (jobid, posid, rid) => {
    localStorage.setItem(`${customer_name}_JOB_ID`, jobid);
    localStorage.setItem(`${customer_name}_POS_ID`, posid);
    localStorage.setItem(`${customer_name}_ST_ID`, 1);
    localStorage.setItem(`${customer_name}_R_ID`, rid);
    localStorage.getItem(`${customer_name}_PAGE`, 1);
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
  };

  //SkillTest click link to go JobAppliedList form
  let skillTestClick = (jobid, posid, rid) => {
    localStorage.setItem(`${customer_name}_JOB_ID`, jobid);
    localStorage.setItem(`${customer_name}_POS_ID`, posid);
    localStorage.setItem(`${customer_name}_R_ID`, rid);
    localStorage.getItem(`${customer_name}_PAGE`, 1);
    localStorage.setItem(`${customer_name}_ST_ID`, 2);
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
  };

  //1st Interview click link to go JobAppliedList form
  let interview1stClick = (jobid, posid, rid) => {
    localStorage.setItem(`${customer_name}_JOB_ID`, jobid);
    localStorage.setItem(`${customer_name}_POS_ID`, posid);
    localStorage.setItem(`${customer_name}_R_ID`, rid);
    localStorage.getItem(`${customer_name}_PAGE`, 1);
    localStorage.setItem(`${customer_name}_ST_ID`, 3);
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
  };

  //2nd Interview click link to go JobAppliedList form
  let interview2ndClick = (jobid, posid, rid) => {
    localStorage.setItem(`${customer_name}_JOB_ID`, jobid);
    localStorage.setItem(`${customer_name}_POS_ID`, posid);
    localStorage.setItem(`${customer_name}_R_ID`, rid);
    localStorage.setItem(`${customer_name}_ST_ID`, 4);
    localStorage.getItem(`${customer_name}_PAGE`, 1);
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
  };

  //Approve click link to go JobAppliedList form
  let approveClick = (jobid, posid, rid) => {
    localStorage.setItem(`${customer_name}_JOB_ID`, jobid);
    localStorage.setItem(`${customer_name}_POS_ID`, posid);
    localStorage.setItem(`${customer_name}_R_ID`, rid);
    localStorage.setItem(`${customer_name}_ST_ID`, 6);
    localStorage.getItem(`${customer_name}_PAGE`, 1);
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
  };

  //Offer click link to go JobAppliedList form
  let offerClick = (jobid, posid, rid) => {
    localStorage.setItem(`${customer_name}_JOB_ID`, jobid);
    localStorage.setItem(`${customer_name}_POS_ID`, posid);
    localStorage.setItem(`${customer_name}_R_ID`, rid);
    localStorage.setItem(`${customer_name}_ST_ID`, 7);
    localStorage.getItem(`${customer_name}_PAGE`, 1);
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
  };

  //socket data to display loop
  if (notiData.length > 0) {
    let res = topData.map((data) => {
      if (data.template_job_position_id == notiData.template_job_position_id) {
        data.total_applicant = parseInt(notiData.total_applicant);
        data.today_applicant = parseInt(notiData.today_applicant);
        data.job_category_apply = parseInt(notiData.job_category_apply);
        data.job_category_codingtest = parseInt(
          notiData.job_category_codingtest
        );
        data.job_category_1st_interview = parseInt(
          notiData.job_category_1st_interview
        );
        data.job_category_2nd_interview = parseInt(
          notiData.job_category_2nd_interview
        );
        data.job_category_3rd_interview = parseInt(
          notiData.job_category_3rd_interview
        );
        data.job_category_approvel = parseInt(notiData.job_category_approvel);
        data.job_category_offerletter = parseInt(
          notiData.job_category_offerletter
        );
        data.job_category_accept_reject = parseInt(
          notiData.job_category_accept_reject
        );
        data.job_category_onboard = parseInt(notiData.job_category_onboard);
        data.total_cancel_reject = parseInt(notiData.total_cancel_reject);
        return data;
      }
      return data;
    });

    let arr = [];
    res.forEach((a) => {
      arr.push(a.total_applicant);
    });
    setSeries([
      {
        data: arr,
      },
    ]);
    setTopData(res);
    setNotiData([]);
  }

  return (
    <>
      <Loading start={loading} />
      <DashboardForm
        options={options}
        series={series}
        topData={topData}
        candidateCard={candidateCard}
        appliedClick={appliedClick}
        skillTestClick={skillTestClick}
        interview1stClick={interview1stClick}
        interview2ndClick={interview2ndClick}
        approveClick={approveClick}
        offerClick={offerClick}
        barHeigh={barHeigh}
        success={success}
        error={error}
      />
    </>
  );
};

export default DashboardIndex;
