// ==UserScript==
// @name         donhang-giaohangnhanh-multicheck
// @namespace    http://tampermonkey.net/
// @version      16.11.0
// @description  try to take over the world!
// @author       CrissAnger
// @match        https://donhang.ghn.vn/*
// @match        https://tracuunoibo.ghn.vn/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js
// @require       https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment-with-locales.min.js
// @resource   IMPORTED_CSS https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";
  //jQuery('head').append(<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">)
  jQuery(document).ready(function ($) {
    //console.log("inject loaded");
    moment.locale("vi");
    class GHN_MULTICHECK {
      constructor() {
        this.initProperties();
        this.initHTML();
        this.initEvent();
      }
      initProperties() {
        this.filter = [
          { name: "time", value: "Thời gian Tới Kho" },
          { name: "time_end", value: "Thời gian Kết thúc giao" },
          { name: "buucucgiao", value: "Kho Hiện Tại" },
          { name: "status", value: "Trạng thái" },
          { name: "langiao", value: "Lần giao" },
          { name: "call_times", value: "Cuộc gọi" },
          { name: "GhiChuGHN", value: "Mã NV" },
          { name: "name_NV", value: "Tên NV" },
          { name: "reason", value: "Lý Do" },
          { name: "buucuclay", value: "Bưu Cục Lấy" },
          { name: "bankiem", value: "Check Bắn Kiểm" },
          { name: "clientID", value: "Mã Shop" },
          { name: "clientName", value: "Tên Shop" },
          { name: "timeUpdate", value: "Thời gian cập nhật" },
          { name: "revert", value: "check Revert" },
          { name: "timeEp", value: "Time Ép CD" },
          { name: "denQuan", value: "Đến Quận" },
          { name: "timeCreate", value: "Thời gian tạo" },

          { name: "transferToTruck", value: "Tạo LC" },
          { name: "NVLay", value: "NVLAY" },
          { name: "SMEORKA", value: "SME-KA" },
          { name: "lanlay", value: "Lần Lấy" },
          { name: "lichsu", value: "Lịch Sử Giao" },
          { name: "goitaidiem", value: "Check Gởi Tại Điểm" },
          { name: "sdtNVXL", value: "Check SDT NVXL nhận vô kho" },
        ];
      }
      initHTML() {
        $(".header-container .row .col-md-8")
          .removeClass("col-md-8")
          .addClass("col-md-10");
        $(
          "#root .header"
        ).append(`<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="myModal" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Tìm kiếm nâng cao</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formMultiSearch">
        <div class="form-group">
		    <label for="exampleFormControlTextarea1">Danh sách đơn hàng: (Mỗi mã đơn hàng 1 dòng)</label>
		    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="ids" required></textarea>
		</div>
		<div class="card">
		  <div class="card-body">
		    <h5 class="card-title">Bộ lọc:</h5>
		    <div class="row col">
				<div class="form-check col-md-2 pl-3">
					<label><input class="form-check-input" type="checkbox" value="time" name="filter" checked> Thời gian</label>
				</div>
				<div class="form-check col-md-2 pl-3">
					<label><input class="form-check-input" type="checkbox" value="buucucgiao" name="filter" checked> Kho Hiện Tại</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="buucuclay" name="filter" unchecked> Bưu Cục Lấy</label>
				</div>
				<div class="form-check col-md-2 pl-3">
					<label><input class="form-check-input" type="checkbox" value="status" name="filter" checked> Tình trạng</label>
				</div>
				<div class="form-check col-md-2 pl-3">
					<label><input class="form-check-input" type="checkbox" value="langiao" name="filter" checked> Lần Giao</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="bankiem" name="filter" unchecked> Check đã bắn kiểm</label>
				</div>
				<div class="form-check col-md-2 pl-3">
					<label><input class="form-check-input" type="checkbox" value="call_times" name="filter" unchecked> Cuộc gọi</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input class="checkbox" type="checkbox" value="GhiChuGHN" name="filter" checked> Mã NV</label>
                </div>
                <div class="form-check col-md-2 pl-3">
					<label><input class="checkbox" type="checkbox" value="name_NV" name="filter" checked> Tên NV</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="reason" name="filter" checked> Ghi Chú</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="clientID" name="filter" unchecked> ID SHOP</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="clientName" name="filter" unchecked> Tên Shop</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="timeUpdate" name="filter" checked> Thời gian cập nhật</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="revert" name="filter" unchecked> Check revert</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="timeEp" name="filter" unchecked> Time Ép CD</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="denQuan" name="filter" unchecked> Đến Quận</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="timeCreate" name="filter" unchecked> Thời gian tạo đơn</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="transferToTruck" name="filter" unchecked> Thời gian tạo LC</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="NVLay" name="filter" unchecked> NV Lấy</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="SMEORKA" name="filter" unchecked> SME?</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="lanlay" name="filter" unchecked> Lần Lấy</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="lichsu" name="filter" unchecked> Lịch Sử Giao</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="goitaidiem" name="filter" unchecked> Gởi Tại Điểm</label>
				</div>
                <div class="form-check col-md-2 pl-3">
					<label><input type="checkbox" value="sdtNVXL" name="filter" unchecked> Check SDT NVXL</label>
				</div>



		    </div>
		  </div>
		</div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" form="formMultiSearch" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
  </div>
</div>`);
        $(
          ".Flex.content"
        ).prepend(`<div class="row" style="background-color:#fff;"><div class="container"><table class="table" id="resultMulti" style="display:none">
  <thead>
    <tr>
      <th scope="col" data-value="id">#</th>
      <th scope="col" data-value="time">Thời gian Tới kho</th>
      <th scope="col" data-value="buucucgiao">Bưu cục lấy</th>
      <th scope="col" data-value="time_end">Thời gian Kết thúc giao</th>
      <th scope="col" data-value="buucucgiao">Bưu cục giao</th>
      <th scope="col" data-value="status">Tình trạng</th>
      <th scope="col" data-value="bankiem">Check đã bắn kiểm</th>
      <th scope="col" data-value="ID_NV">NV GIAO</th>
      <th scope="col" data-value="GhiChuGHN">Mã NV</th>
      <th scope="col" data-value="name_NV">Tên NV</th>
      <th scope="col" data-value="reason">Lý Do NV</th>
      <th scope="col" data-value="clientID">ID SHOP</th>
      <th scope="col" data-value="clientName">Tên SHOP</th>
      <th scope="col" data-value="timeUpdate">Thời gian cập nhật</th>
      <th scope="col" data-value="revert">Check Revert</th>
      <th scope="col" data-value="timeEp">Time Ép CD</th>
      <th scope="col" data-value="denQuan">Huyện Giao</th>
      <th scope="col" data-value="timeCreate">Time Tạo Đơn</th>
      <th scope="col" data-value="NVLay">NV Lấy</th>
      <th scope="col" data-value="SMEORKA">SME - KA</th>
      <th scope="col" data-value="lanlay">Lần Lấy</th>
      <th scope="col" data-value="lichsu">Lịch Sử Giao hàng</th>
      <th scope="col" data-value="goitaidiem">Check Gởi Tại Điểm</th>
      <th scope="col" data-value="sdtNVXL">Check SDT NVXL</th>
    </tr>
  </thead>
  <tbody></tbody></table></div></div>`);

        $("div.header .header-center").append(
          `<button data-toggle="modal" data-target=".bd-example-modal-lg" class="button-search block-center btn btn-primary">TÌM KIẾM NÂNG CAO</span></button>`
        );
      }
      initEvent() {
        let self = this;
        $("#formMultiSearch").submit(function (event) {
          event.preventDefault();
          let data = $(this).serializeArray();
          //console.log(data);
          let ids = data
            .find((x) => x.name == "ids")
            .value.trim()
            .split("\n");
          //console.log(ids);
          let filter = data
            .filter((x) => x.name == "filter")
            .map((x) => x.value);
          //alert(filter.toString());
          //   console.log(filter);
          $("#myModal").modal("hide");
          $("#resultMulti thead tr").html(
            `<th scope="col" data-value="id">#</th>`
          );
          filter.forEach((item) => {
            //alert(item.toString());
            let itemFilter = self.filter.find((x) => x.name == item);
            //console.log(itemFilter);
            if (itemFilter) {
              $("#resultMulti thead tr").append(
                `<td scope="col" data-value="${itemFilter.name}">${itemFilter.value}</td>`
              );
            }
          });
          $("#resultMulti tbody").html("");
          $("#resultMulti").show();
          $(".order-tracking-customer").hide();
          (async (ids) => {
            for (let i = 0; i < ids.length; ++i) {
              let id = ids[i].trim();
              let response = await fetch(
                "https://online-gateway.ghn.vn/order-tracking/public-api/client/tracking-logs",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ order_code: id }),
                }
              );
              let json = await response.json();
              //callog
              let jsonCallLog = null;
              if (filter.findIndex((x) => x == "call_times") != -1) {
                let callLogResponse = await fetch(
                  "https://fe-online-gateway.ghn.vn/order-tracking/public-api/client/call-logs?order_code=" +
                    id
                );
                jsonCallLog = await callLogResponse.json();
              }
              let html = `<tr><td class="font-weight-bold">${id}</td>`;

              if (json.code == 200) {
                //check tracking_logs UNPACKED_AT_LASTMILE

                let UNPACKED_AT_LASTMILE = json.data.tracking_logs
                  .filter((x) => x.action_code == "RECEIVED_AT_LASTMILE")
                  .slice(-1);
                //console.log(UNPACKED_AT_LASTMILE);
                let khogannhat = json.data.tracking_logs.slice(-1);
                //console.dir(khogannhat [0]);
                //console.log("cai can xuat" + UNPACKED_AT_LASTMILE.toString());

                let datastoring1 = json.data.tracking_logs
                  .filter((x) => x.status == "storing")
                  .slice(-1);
                //XUẤT TIME TỚI KHO
                //check datastoring (trang thai storing) neu don hang khong luân chuyển qua inside
                if (
                  filter.findIndex((x) => x == "time") != -1 &&
                  datastoring1[0]
                ) {
                  //html +=`<td>${moment(UNPACKED_AT_LASTMILE.action_at).format('LLLL')}</td>`
                  //XUẤT TIME TÍNH TỪ LÚC RÃ Ở KHO TỚI HIỆN TẠI
                  //html +=`<td>${moment(datastoring1[0].action_at).fromNow()}</td>`
                  if (UNPACKED_AT_LASTMILE.length > 0) {
                    html += `<td>${moment(
                      UNPACKED_AT_LASTMILE[0].action_at
                    ).fromNow()}</td>`;
                  } else {
                    html += `<td class="text-warning">Chưa đến bưu cục giao</td>`;
                  }
                } else {
                  html += `<td></td>`;
                }
                if (UNPACKED_AT_LASTMILE.length > 0) {
                  //xuất kho hiện tại
                  if (filter.findIndex((x) => x == "buucucgiao") != -1) {
                    if (UNPACKED_AT_LASTMILE.length > 0) {
                      //console.dir(khogannhat);
                      html += `<td>${UNPACKED_AT_LASTMILE[0].location.address}</td>`;
                    } else {
                      html += `<td>${khogannhat[0].location.address}</td>`;
                    }
                    //html += <td>${UNPACKED_AT_LASTMILE[0].location.address}</td>;
                  }
                } else {
                  //console.dir(khogannhat);
                  if (!UNPACKED_AT_LASTMILE) {
                    html += `<td class="text-warning">Chưa đến bưu cục giao</td>`;
                  } else {
                    html += `<td>${khogannhat[0].location.address}</td>`;
                  }

                  /*if(filter.findIndex(x=>x=="time")!=-1){
										html +=`<td></td>`;
									}*/
                }

                //xuất bưu cục lấy
                if (filter.findIndex((x) => x == "buucuclay") != -1) {
                  let SCAN_TO_STORING = json.data.tracking_logs.find(
                    (x) => x.action_code == "SCAN_TO_STORING"
                  );
                  let PICKED_AT_WAREHOUSE = json.data.tracking_logs.find(
                    (x) => x.action_code == "PICKED_AT_WAREHOUSE"
                  );
                  let RECEIVE_FROM_CLIENT = json.data.tracking_logs.find(
                    (x) => x.action_code == "RECEIVE_FROM_CLIENT"
                  );
                  if (SCAN_TO_STORING) {
                    html += `<td>${SCAN_TO_STORING.location.address}</td>`;
                  } else {
                    if (PICKED_AT_WAREHOUSE) {
                      html += `<td>${PICKED_AT_WAREHOUSE.location.address}</td>`;
                    } else {
                      if (RECEIVE_FROM_CLIENT) {
                        html += `<td>${RECEIVE_FROM_CLIENT.location.address}</td>`;
                      } else {
                        html += `<td></td>`;
                      }
                    }
                  }
                }
                //xuất trạng thái
                if (filter.findIndex((x) => x == "status") != -1) {
                  let status = json.data.order_info.status;
                  if (json.data.order_info.status == "delivered") {
                    html += `<td class="text-success">${json.data.order_info.status_name}</td>`;
                  } else if (status == "delivery_fail" || status == "return") {
                    html += `<td class="text-danger">${json.data.order_info.status_name}</td>`;
                  } else {
                    html += `<td>${json.data.order_info.status_name}</td>`;
                  }
                }

                //xuất lần giao
                if (filter.findIndex((x) => x == "langiao") != -1) {
                  let langiao = json.data.tracking_logs.filter(
                    (x) => x.status == "delivering"
                  ).length;
                  let COLLECT_DELIVERING_MONEY = json.data.tracking_logs.filter(
                    (x) => x.action_code == "COLLECT_DELIVERING_MONEY"
                  ).length;
                  if (COLLECT_DELIVERING_MONEY > 0) {
                    langiao = langiao - 1;
                  }
                  if (langiao > 2)
                    html += `<td style="background-color: red">${langiao} lần</td>`;
                  else html += `<td>${langiao} lần</td>`;
                }

                //xuất log gọi
                if (filter.findIndex((x) => x == "call_times") != -1) {
                  if (jsonCallLog.code == 200) {
                    let callsTime = jsonCallLog.data.length;
                    let callsTimeSuccess = jsonCallLog.data.filter(
                      (x) => x.duration > 0
                    ).length;
                    html += `<td>${callsTime} Cuộc gọi/ ${callsTimeSuccess} thành công</td>`;
                  } else {
                    html += `<td>${jsonCallLog.message}</td>`;
                  }
                }
                //xuất Bắn kiểm
                if (filter.findIndex((x) => x == "bankiem") != -1) {
                  let bankiemdongiao = json.data.tracking_logs.find(
                    (x) => x.status == "delivery_fail_to_storing"
                  );
                  let bankiemdonlay = json.data.tracking_logs.find(
                    (x) => x.status == "picked_to_storing"
                  );
                  let delivered = json.data.order_info.status == "delivered";
                  let status = json.data.order_info.status;
                  let action = json.data.order_info.action;
                  let status_name = json.data.order_info.status_name;
                  let scantostoring = json.data.tracking_logs.find(
                    (x) => x.action_code == "SCAN_TO_STORING"
                  );
                  //check trạng thái hiện tại
                  if (
                    (action == "SCAN_TO_STORING") |
                    (action == "PACKED_TO_SORTING")
                  ) {
                    html += `<td>Đã được bắn kiểm</td>`;
                  } else {
                    html += `<td>Chưa được bắn kiểm</td>`;
                  }
                }

                //xuất lý do + tên NV
                if (
                  (filter.findIndex((x) => x == "GhiChuGHN") != -1) |
                  (filter.findIndex((x) => x == "name_NV") != -1) |
                  (filter.findIndex((x) => x == "reason") != -1)
                ) {
                  let data1 = json.data;
                  let tenNV = 0;
                  //ALL DATA CHO NAY
                  console.dir(data1);
                  //var proto = {};
                  //let test=Object.create(proto);
                  //let test2=test.getPrototypeOf(test);
                  //console.log(test);
                  let status = json.data.order_info.status;
                  //Lay trang thai cuoi cung cua don hang
                  let trangthaicuoi = json.data.tracking_logs.slice(-1).pop();
                  //console.dir(trangthaicuoi);
                  let trangthaikecuoi = json.data.tracking_logs.slice(-2)[0];
                  //console.dir(trangthaikecuoi);

                  //Trang thai tra hang
                  if (
                    (trangthaicuoi.status == "waiting_to_return_to_storing") |
                    (trangthaicuoi.status == "return") |
                    (trangthaicuoi.status == "waiting_to_return")
                  ) {
                    tenNV += 1;
                    let nhanviengiaocuoi = json.data.tracking_logs.filter(
                      (x) => x.status == "delivery_fail"
                    );
                    let nhanviencuoicunggiao = nhanviengiaocuoi
                      .filter((x) => x.action_code == "DELIVER_FAILED")
                      .slice(-1);
                    //console.dir(nhanviencuoicunggiao);
                    if (nhanviencuoicunggiao.length > 0) {
                      html += `<td>${nhanviencuoicunggiao[0].executor["employee_id"]} </td>`;
                      html += `<td>${nhanviencuoicunggiao[0].executor["name"]} </td>`;
                      if (nhanviencuoicunggiao[0].reason != null) {
                        /*let nhanviencuoicunggiao2=nhanviengiaocuoi.filter(x=>x.action_code=="DELIVER_FAILED");
                                                 html+='<td>';
                                                 $.each(nhanviencuoicunggiao2,function(index,value){
                                                     html+=`Lần  ${index}${value.reason.split("-")[0].toString()}</br>`;
                                                 });
                                                 html+='</td>';*/
                        //nhanviencuoicunggiao.forEach(element => html+='<td>${element.reason.toString()}</td>')
                        html += `<td>${
                          nhanviencuoicunggiao[0].reason.split("-")[0]
                        } </td>`;
                      } else {
                        html += `<td>${nhanviencuoicunggiao[0].status_name} </td>`;
                      }
                    } else {
                      tenNV += 1;
                      let nhanviengiaocuoi2 = json.data.tracking_logs
                        .filter((x) => x.status == "return")
                        .slice(-1);
                      if (nhanviengiaocuoi2.length > 0) {
                        html += `<td>${nhanviengiaocuoi2[0].executor["employee_id"]} </td>`;
                        html += `<td>${nhanviengiaocuoi2[0].executor["name"]} </td>`;
                        //html += <td>${nhanviengiaocuoi2[0].reason.split("-")[0]} </td>;
                      }
                    }
                  }
                  //returned
                  if (trangthaicuoi.status == "returned") {
                    tenNV += 1;
                    let returned = json.data.tracking_logs
                      .filter((x) => x.status == "returned")
                      .slice(-1);
                    //console.dir(returned);
                    html += `<td>${returned[0].executor["employee_id"]} </td>`;
                    html += `<td>${returned[0].executor["name"]} </td>`;
                    html += `<td></td>`;
                  }
                  //returning
                  if (trangthaicuoi.status == "returning") {
                    tenNV += 1;
                    let returning = json.data.tracking_logs
                      .filter((x) => x.status == "returning")
                      .slice(-1);
                    //console.dir(returning);
                    html += `<td>${returning[0].executor["employee_id"]} </td>`;
                    html += `<td>${returning[0].executor["name"]} </td>`;
                    html += `<td></td>`;
                  }
                  //"pick_fail"
                  if (trangthaicuoi.status == "pick_fail") {
                    tenNV += 1;
                    let pick_fail = json.data.tracking_logs
                      .filter((x) => x.status == "pick_fail")
                      .slice(-1);
                    //console.dir(pick_fail);
                    html += `<td>${pick_fail[0].executor["employee_id"]} </td>`;
                    html += `<td>${pick_fail[0].executor["name"]} </td>`;
                    html += `<td></td>`;
                  }
                  //"picking"
                  if (trangthaicuoi.status == "picking") {
                    tenNV += 1;
                    let picking = json.data.tracking_logs
                      .filter((x) => x.status == "picking")
                      .slice(-1);
                    //console.dir(picking);
                    html += `<td>${picking[0].executor["employee_id"]} </td>`;
                    html += `<td>${picking[0].executor["name"]} </td>`;
                    html += `<td></td>`;
                  }

                  //Trang thai hang that lac
                  if (trangthaicuoi.status == "lost") {
                    tenNV += 1;
                    let delivering = json.data.tracking_logs
                      .filter((x) => x.status == "delivering")
                      .slice(-1);
                    if (delivering.length != 0) {
                      html += `<td>${delivering[0].executor["employee_id"]} </td>`;
                      html += `<td>${delivering[0].executor["name"]} </td>`;
                      html += `<td></td>`;
                    }
                  }

                  //trang thai dang giao
                  if (trangthaicuoi.status == "delivering") {
                    tenNV += 1;
                    let delivering = json.data.tracking_logs
                      .filter((x) => x.status == "delivering")
                      .slice(-1);
                    html += `<td>${delivering[0].executor["employee_id"]} </td>`;
                    html += `<td>${delivering[0].executor["name"]} </td>`;
                    html += `<td></td>`;
                  }
                  //trang thai da lay hang
                  if (trangthaicuoi.status == "picked") {
                    tenNV += 1;
                    //alert("DA VO");
                    /*console.dir(trangthaikecuoi);
                                         if(trangthaikecuoi.action_code=="PACKED_TO_SORTING" && trangthaikecuoi.status=="storing"){
                                             alert("abc");
                                             html += <td>${picked.executor["employee_id"]} </td>;
                                             html += <td>${picked.executor["name"]} </td>;
                                             html +=`<td></td>`;
                                         }*/

                    let picked = json.data.tracking_logs.find(
                      (x) => x.status == "picked"
                    );
                    //console.dir("picked="&picked);
                    html += `<td>${picked.executor["employee_id"]} </td>`;
                    html += `<td>${picked.executor["name"]} </td>`;
                    html += `<td></td>`;
                  }
                  if (trangthaicuoi.status == "picked_to_storing") {
                    tenNV += 1;
                    //alert("DA VO");
                    /*console.dir(trangthaikecuoi);
                                         if(trangthaikecuoi.action_code=="PACKED_TO_SORTING" && trangthaikecuoi.status=="storing"){
                                             alert("abc");
                                             html += <td>${picked.executor["employee_id"]} </td>;
                                             html += <td>${picked.executor["name"]} </td>;
                                             html +=`<td></td>`;
                                         }*/

                    let picked = json.data.tracking_logs.find(
                      (x) => x.status == "picked"
                    );
                    //console.dir("picked="&picked);
                    html += `<td>${picked.executor["employee_id"]} </td>`;
                    html += `<td>${picked.executor["name"]} </td>`;
                    html += `<td></td>`;
                  }
                  //sang sang giao hang revert
                  if (
                    trangthaicuoi.action_code == "ADD_DELIVERY_TRIP" &&
                    trangthaicuoi.status == "storing"
                  ) {
                    tenNV += 1;
                    let DELIVER_FAILED = json.data.tracking_logs
                      .filter((x) => x.action_code == "DELIVER_FAILED")
                      .slice(-1);
                    if (DELIVER_FAILED.length != 0) {
                      html += `<td>${DELIVER_FAILED[0].executor["employee_id"]} </td>`;
                      html += `<td>${DELIVER_FAILED[0].executor["name"]} </td>`;
                      html += `<td></td>`;
                    }
                  }
                  //sang sang giao hang
                  if (
                    trangthaikecuoi.action_code == "RECEIVED_AT_LASTMILE" &&
                    trangthaicuoi.status == "storing"
                  ) {
                    if (
                      trangthaicuoi.action_code == "UNPACKED_AT_LASTMILE" &&
                      trangthaicuoi.status == "storing"
                    ) {
                      tenNV + -1;
                    } else {
                      tenNV += 1;
                      //alert("1");
                      html += `<td></td>`;
                      html += `<td></td>`;
                      html += `<td></td>`;
                    }
                  }
                  if (
                    (trangthaikecuoi.action_code == "PACKED_TO_SORTING" &&
                      trangthaikecuoi.status == "storing") |
                    (trangthaikecuoi.action_code == "SCAN_TO_STORING" &&
                      trangthaikecuoi.status == "picked_to_storing")
                  ) {
                    if (tenNV == 0) {
                      tenNV += 1;
                      //alert("DA VO");
                      //console.dir(trangthaicuoi);
                      //{html +=`<td></td>`;html +=`<td></td>`;html +=`<td></td>`;}
                      /*console.dir(trangthaikecuoi);
                                         if(trangthaikecuoi.action_code=="PACKED_TO_SORTING" && trangthaikecuoi.status=="storing"){
                                             alert("abc");
                                             html += <td>${picked.executor["employee_id"]} </td>;
                                             html += <td>${picked.executor["name"]} </td>;
                                             html +=`<td></td>`;
                                         }*/

                      let picked = json.data.tracking_logs
                        .filter((x) => x.status == "picked")
                        .slice(-1);

                      //console.dir(picked);
                      if (picked.length == 0) {
                        tenNV += 1;
                        let DELIVER_FAILED = json.data.tracking_logs
                          .filter((x) => x.action_code == "DELIVER_FAILED")
                          .slice(-1);
                        if (DELIVER_FAILED.length != 0) {
                          html += `<td>${DELIVER_FAILED[0].executor["employee_id"]} </td>`;
                          html += `<td>${DELIVER_FAILED[0].executor["name"]} </td>`;
                          html += `<td></td>`;
                        }
                      } else {
                        tenNV += 1;
                        html += `<td>${picked[0].executor["employee_id"]} </td>`;
                        html += `<td>${picked[0].executor["name"]} </td>`;
                        html += `<td></td>`;
                      }
                    }
                  }

                  //trang thai giao that bai
                  if (
                    (trangthaicuoi.status == "delivery_fail") |
                    (trangthaicuoi.status == "delivery_fail_to_storing") |
                    (trangthaicuoi.status == "return_transporting") |
                    (trangthaicuoi.action_code == "UNPACKED_AT_LASTMILE" &&
                      trangthaicuoi.status == "storing") |
                    (trangthaicuoi.action_code == "PACKED_TO_SORTING" &&
                      trangthaicuoi.status == "storing")
                  ) {
                    tenNV += 1;
                    let deliveryfail = json.data.tracking_logs
                      .filter((x) => x.status == "delivery_fail")
                      .slice(-1);
                    if (
                      trangthaicuoi.action_code == "UNPACKED_AT_LASTMILE" &&
                      trangthaicuoi.status == "storing"
                    ) {
                      html += `<td></td>`;
                      html += `<td></td>`;
                      html += `<td></td>`;
                    } else {
                      tenNV += 1;
                      //alert('vo');

                      if (deliveryfail.length != 0) {
                        //let reason=deliveryfail[0].reason.split("-")[0];
                        //alert (reason);
                        html += `<td>${deliveryfail[0].executor["employee_id"]} </td>`;
                        html += `<td>${deliveryfail[0].executor["name"]} </td>`;
                        if (deliveryfail[0].reason != null) {
                          let reason = deliveryfail[0].reason.split("-")[0];
                          html += `<td>${reason}</td>`;
                        } else {
                          let reason = deliveryfail[0].status_name;
                          html += `<td>${reason}</td>`;
                        }
                      }
                    }
                  }
                  //trang thai da giao hang
                  if (trangthaicuoi.status == "delivered") {
                    tenNV += 1;
                    let delivered = json.data.tracking_logs
                      .filter((x) => x.status == "delivered")
                      .slice(-1);
                    html += `<td>${delivered[0].executor["employee_id"]} </td>`;
                    html += `<td>${delivered[0].executor["name"]} </td>`;
                    html += `<td></td>`;
                    //alert("vo");
                  }
                  //trang thai da giao hang
                  //trạng thái storing

                  //All of retied - tat ca cac trang thai con lai
                  let cactrangthai = [
                    "delivered",
                    "delivery_fail",
                    "picked_to_storing",
                    "picked",
                    "pick_fail",
                    "returning",
                    "returned",
                    "waiting_to_return_to_storing",
                  ];
                  if (!trangthaicuoi.status.includes(cactrangthai)) {
                    //alert(tenNV);
                    if (tenNV == 0) {
                      html += `<td></td>`;
                      html += `<td></td>`;
                      html += `<td></td>`;
                    }
                    //if(tenNV==1){html +=`<td></td>`;html +=`<td></td>`;}
                  }
                  //console.log(tenNV);
                } else {
                  /*html +=`<td></td>`;*/
                }
                //xuất ID SHOP + tên shop
                if (filter.findIndex((x) => x == "clientID") != -1) {
                  let ready_to_pick = json.data.tracking_logs.find(
                    (x) => x.status == "ready_to_pick"
                  );
                  //console.dir (ready_to_pick);
                  html += `<td>${ready_to_pick.executor["client_id"]} </td>`;
                }

                if (filter.findIndex((x) => x == "clientName") != -1) {
                  let ready_to_pick = json.data.tracking_logs.find(
                    (x) => x.status == "ready_to_pick"
                  );
                  //console.dir (ready_to_pick);
                  html += `<td>${ready_to_pick.executor["name"]} </td>`;
                }

                //Xuất time cập nhật - chỉ hiển thị khi đơn GTC/Giao that bai
                if (filter.findIndex((x) => x == "timeUpdate") != -1) {
                  let timeUP = 0;
                  let trangthaicuoi = json.data.tracking_logs.slice(-1).pop();
                  let trangthaikecuoi = json.data.tracking_logs.slice(-2)[0];
                  //console.dir(trangthaikecuoi);
                  if (trangthaicuoi.status == "delivered") {
                    timeUP += 1;
                    //alert("vo");
                    let delivered = json.data.tracking_logs
                      .filter((x) => x.status == "delivered")
                      .slice(-1);
                    html += `<td>${moment(delivered[0].action_at).format(
                      "DD/MM/YYYY, HH:mm"
                    )} </td>`;
                  }
                  if (
                    (trangthaicuoi.status == "delivery_fail") |
                    (trangthaicuoi.status == "delivery_fail_to_storing")
                  ) {
                    timeUP += 1;

                    let deliveryfail = json.data.tracking_logs
                      .filter((x) => x.status == "delivery_fail")
                      .slice(-1);
                    //console.dir(deliveryfail);
                    //console.log(deliveryfail.length);
                    if (Array.isArray(deliveryfail) && deliveryfail.length) {
                      //alert("voo");
                      html += `<td>${moment(deliveryfail[0].action_at).format(
                        "DD/MM/YYYY, HH:mm"
                      )} </td>`;
                    }
                  }
                  //|trangthaicuoi.status=="returned"
                  if (trangthaicuoi.status == "returned") {
                    timeUP += 1;
                    let returned = json.data.tracking_logs
                      .filter((x) => x.status == "returned")
                      .slice(-1);
                    html += `<td>${moment(returned[0].action_at).format(
                      "DD/MM/YYYY, HH:mm"
                    )} </td>`;
                  }
                  if (
                    (trangthaicuoi.status == "picked") |
                    (trangthaicuoi.status == "picked_to_storing") |
                    (trangthaikecuoi.action_code == "PACKED_TO_SORTING" &&
                      trangthaikecuoi.status == "storing") |
                    (trangthaicuoi.status == "storing" &&
                      trangthaicuoi.action_code == "RECEIVED_AT_LASTMILE")
                  ) {
                    timeUP += 1;
                    let picked = json.data.tracking_logs
                      .filter((x) => x.status == "picked")
                      .slice(-1);
                    //alert("da vo");
                    //console.dir(picked);
                    if (picked.length == 0) {
                      let DELIVER_FAILED = json.data.tracking_logs.filter(
                        (x) => x.action_code == "DELIVER_FAILED"
                      );
                      if (DELIVER_FAILED.length > 0) {
                        html += `<td>${moment(
                          DELIVER_FAILED[0].action_at
                        ).format("DD/MM/YYYY, HH:mm")} </td>`;
                        html += `<td></td>`;
                      }
                    } else {
                      html += `<td>${moment(picked[0].action_at).format(
                        "DD/MM/YYYY, HH:mm"
                      )} </td>`;
                    }
                  }
                  if (
                    (trangthaicuoi.status == "waiting_to_return_to_storing") |
                    (trangthaicuoi.status == "waiting_to_return") |
                    (trangthaicuoi.status == "return") |
                    (trangthaicuoi.status == "return_transporting")
                  ) {
                    timeUP += 1;
                    let delivery_fail = json.data.tracking_logs
                      .filter((x) => x.status == "delivery_fail")
                      .slice(-1);
                    //alert(delivery_fail.length);
                    if (delivery_fail.length == 0) {
                      delivery_fail = json.data.tracking_logs.filter(
                        (x) => x.status == "return"
                      );
                    } else {
                      console.dir(delivery_fail);
                      if (delivery_fail.indexOf("action_at")) {
                        html += `<td>${moment(
                          delivery_fail[0].action_at
                        ).format("DD/MM/YYYY, HH:mm")} </td>`;
                      }
                    }
                  }
                  if (trangthaicuoi.status == "pick_fail") {
                    timeUP += 1;
                    let pick_fail = json.data.tracking_logs
                      .filter((x) => x.status == "pick_fail")
                      .slice(-1);
                    html += `<td>${moment(pick_fail[0].action_at).format(
                      "DD/MM/YYYY, HH:mm"
                    )} </td>`;
                  }
                  //"returned"
                  //delivering
                  if (timeUP == 0) {
                    html += `<td></td>`;
                  }
                  /*if(trangthaicuoi.status=="delivering"|trangthaicuoi.status=="returning"|(trangthaicuoi.status=="storing" && trangthaicuoi.action_code=="UNPACKED_AT_LASTMILE")|trangthaicuoi.status=="picking"){
                                        html +=`<td></td>`;
                                    }*/
                  //else{html +=`<td></td>`;}
                }
                //Check revert
                if (filter.findIndex((x) => x == "revert") != -1) {
                  let revert = json.data.tracking_logs.find(
                    (x) => x.status == "waiting_to_return_to_storing"
                  );
                  //console.dir(revert);
                  if (revert) {
                    html += `<td>Đã đc revert ${moment(
                      revert.action_at
                    ).fromNow()}</td>`;
                  } else {
                    html += "<td></td>";
                  }
                }
                //Time eps chuyen di
                if (filter.findIndex((x) => x == "timeEp") != -1) {
                  let timeUP = 0;
                  let khogannhat = json.data.tracking_logs.slice(-1);
                  //console.dir(khogannhat);
                  let EpGiao = json.data.tracking_logs
                    .filter((x) => x.action_code == "START_DELIVERY_TRIP")
                    .slice(-1);
                  //if(EpGiao.length==0){EpGiao=json.data.tracking_logs.filter(x=>x.action_code=="ADD_DELIVERY_TRIP").slice(-1);}
                  let CANCEL_COLLECT_DELIVERING_MONEY =
                    json.data.tracking_logs.find(
                      (x) => x.action_code == "CANCEL_COLLECT_DELIVERING_MONEY"
                    );
                  let COLLECT_DELIVERING_MONEY = json.data.tracking_logs.find(
                    (x) => x.action_code == "COLLECT_DELIVERING_MONEY"
                  );
                  //console.dir(EpGiao);
                  let EpLay = json.data.tracking_logs
                    .filter((x) => x.action_code == "START_PICKING_TRIP")
                    .slice(-1);
                  //console.dir(EpLay);
                  let EpTra = json.data.tracking_logs
                    .filter((x) => x.action_code == "START_RETURN_TRIP")
                    .slice(-1);
                  console.dir(EpTra);

                  //Chỉ xuất khi trạng thái cuối ở kho kontum
                  if (
                    (khogannhat[0].location.warehouse_id == 20394000) |
                    (khogannhat[0].location.warehouse_id == 20375000) |
                    (khogannhat[0].location.warehouse_id == 2310) |
                    (khogannhat[0].location.warehouse_id == 20257000)
                  ) {
                    if (CANCEL_COLLECT_DELIVERING_MONEY) {
                      timeUP += 1;
                      //alert("1");
                      html += `<td>Đã đc ép giao ${moment(
                        CANCEL_COLLECT_DELIVERING_MONEY.action_at
                      ).format("DD/MM/YYYY, HH:mm")}</td>`;
                    }
                    if (COLLECT_DELIVERING_MONEY) {
                      //alert("1");
                      html += `<td>Đã đc ép giao ${moment(
                        COLLECT_DELIVERING_MONEY.action_at
                      ).format("DD/MM/YYYY, HH:mm")}</td>`;
                    }

                    if (EpGiao.length != 0) {
                      //alert("1");
                      timeUP += 1;

                      if (
                        EpGiao[0].location.warehouse_id ==
                        khogannhat[0].location.warehouse_id
                      ) {
                        console.dir(EpGiao);
                        html += `<td>Đã đc ép giao ${moment(
                          EpGiao[0].action_at
                        ).format("DD/MM/YYYY, HH:mm")}</td>`;
                      }
                    }
                    if (EpLay.length != 0) {
                      timeUP += 1;

                      if (
                        EpLay[0].location.warehouse_id ==
                        khogannhat[0].location.warehouse_id
                      ) {
                        html += `<td>Đã đc ép lấy ${moment(
                          EpLay[0].action_at
                        ).format("DD/MM/YYYY, HH:mm")}</td>`;
                      }
                    }
                    if (EpTra.length != 0) {
                      timeUP += 1;
                      if (
                        EpTra[0].location.warehouse_id ==
                        khogannhat[0].location.warehouse_id
                      ) {
                        html += `<td>Đã đc ép trả ${moment(
                          EpTra[0].action_at
                        ).format("DD/MM/YYYY, HH:mm")}</td>`;
                      }
                    }
                    if (timeUP == 0) {
                      html += `<td></td>`;
                    }
                  }

                  if (EpGiao) {
                    //html += <td>Đã đc revert ${moment(revert.action_at).fromNow()}</td>;
                  }
                }

                //console.log(html);
                //Xuất đén quận giao
                if (filter.findIndex((x) => x == "denQuan") != -1) {
                  let order_info = json.data.order_info;
                  //console.dir(order_info);
                  let to_address = json.data.order_info.to_address;
                  let tenquan = to_address.substr(4, to_address.length - 4);

                  html += `<td>${tenquan}</td>`;
                }
                //Xuất time tạo đơn
                if (filter.findIndex((x) => x == "timeCreate") != -1) {
                  let timeCreate = json.data.tracking_logs.find(
                    (x) => x.status == "ready_to_pick"
                  );
                  if (timeCreate) {
                    html += `<td>Đã đc tạo lúc ${moment(
                      timeCreate.action_at
                    ).format("DD/MM/YYYY, HH:mm")}</td>`;
                  } else {
                    html += "<td></td>";
                  }
                }

                //Xuất time tạo LC
                if (filter.findIndex((x) => x == "transferToTruck") != -1) {
                  //alert("voo");
                  let timeTransfer = json.data.tracking_logs.find(
                    (x) => x.action_code == "TRANSFER_TO_TRUCK"
                  );
                  //console.log(timeTransfer);
                  if (timeTransfer) {
                    html += `<td>${moment(timeTransfer.action_at).format(
                      "DD/MM/YYYY, HH:mm"
                    )}</td>`;
                  } else {
                    let timeTransporting = json.data.tracking_logs.find(
                      (x) => x.action_code == "TRANSPORTING"
                    );
                    if (timeTransporting) {
                      html += `<td>${moment(timeTransporting.action_at).format(
                        "DD/MM/YYYY, HH:mm"
                      )}</td>`;
                    } else {
                      html += "<td></td>";
                    }
                  }
                }
                //Xuất NV Lấy
                if (filter.findIndex((x) => x == "NVLay") != -1) {
                  //alert("voo");
                  let NVLAY = json.data.tracking_logs
                    .filter((x) => x.action_code == "PICKED_IN_TRIP")
                    .slice(-1);
                  //console.log(NVLAY);
                  if (NVLAY.length != 0) {
                    html += `<td>${NVLAY[0].executor["name"]} </td>`;
                  } else {
                    html += "<td></td>";
                  }
                }
                //Xuất SME-KA
                if (filter.findIndex((x) => x == "SMEORKA") != -1) {
                  //alert("voo");
                  let SME = [
                    "Shopee",
                    "Lazada Market Place",
                    "tiki_c2c",
                    "Tiki.vn",
                  ];
                  let ready_to_pick = json.data.tracking_logs.find(
                    (x) => x.status == "ready_to_pick"
                  );
                  let tenshop = ready_to_pick.executor["name"];
                  console.log(tenshop);

                  if (SME.includes(tenshop)) {
                    html += `<td>KA</td>`;
                  } else {
                    html += `<td>SME</td>`;
                  }
                }
                //xuất lần lấy
                if (filter.findIndex((x) => x == "lanlay") != -1) {
                  let lanlay = json.data.tracking_logs.filter(
                    (x) => x.status == "picking"
                  ).length;
                  //alert(lanlay);

                  if (lanlay > 3)
                    html += `<td style="background-color: red">${lanlay} lần</td>`;
                  else html += `<td>${lanlay} lần</td>`;
                }
                //Xuất lịch sử giao hàng
                if (filter.findIndex((x) => x == "lichsu") != -1) {
                  let nhanviengiaocuoi = json.data.tracking_logs.filter(
                    (x) => x.status == "delivery_fail"
                  );
                  if (nhanviengiaocuoi.length > 0) {
                    let nhanviencuoicunggiao2 = nhanviengiaocuoi.filter(
                      (x) => x.action_code == "DELIVER_FAILED"
                    );
                    html += '<td style="min-width:1080px">';
                    $.each(nhanviencuoicunggiao2, function (index, value) {
                      html += `<p><b>Lần  ${index + 1}:</b>${value.reason
                        .split("-")[0]
                        .toString()}`;
                    });
                    html += "</p></td>";
                  }
                }
                //Check gởi tại điểm
                if (filter.findIndex((x) => x == "goitaidiem") != -1) {
                  let order_info = json.data.order_info;
                  //console.dir(order_info);
                  let station_do_fee = json.data.order_info.station_do_fee;
                  if (station_do_fee) {
                    html += `<td><p><b>Gởi Tại Điểm</b></p></td>`;
                  } else {
                    html += `<td></td>`;
                  }
                }
                //SDT NVXL Nhận tại kho
                if (filter.findIndex((x) => x == "sdtNVXL") != -1) {
                  let NVXL = json.data.tracking_logs
                    .filter((x) => x.action_code == "ADD_DELIVERY_TRIP")
                    .slice(-1);
                  let NVXL2 = json.data.tracking_logs
                    .filter((x) => x.action_code == "RECEIVED_AT_LASTMILE")
                    .slice(-1);
                  console.log(NVXL);
                  if (NVXL.length != 0) {
                    html += `<td><p><b>${NVXL[0].executor["name"]} - ${NVXL[0].executor["phone"]}</p></td>`;
                  } else {
                    if (NVXL2.length != 0) {
                      html += `<td><p><b>${NVXL2[0].executor["name"]} - ${NVXL2[0].executor["phone"]}</p></td>`;
                    }
                  }
                }

                html += "</tr>";
              } else {
                html += `<td colspan="${filter.length}">${json.code_message_value}</td></tr>`;
              }

              $("#resultMulti tbody").append(html);
            }
          })(ids);
        });
      }
    }
    new GHN_MULTICHECK();
  });
})();
