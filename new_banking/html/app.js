const enableToast = (message) => {
  $("#result").html(message).show().delay(2500).fadeOut();
};

$(function () {
  window.addEventListener("message", function (event) {
    if (event.data.type === "openGeneral") {
      $("#waiting").show();
      $("body").addClass("active");
    } else if (event.data.type === "balanceHUD") {
      $(".username1").html(event.data.player);
      $(".curbalance").html(event.data.balance);
    } else if (event.data.type === "closeAll") {
      $(
        "#waiting, #general, #transferUI, #withdrawUI, #depositUI, #topbar"
      ).hide();
      $("body").removeClass("active");
    } else if (event.data.type === "result") {
      if (event.data.t == "success") {
        $("#result").attr("class", "alert-green");
      } else {
        $("#result").attr("class", "alert-orange");
      }
      enableToast(event.data.m);
    }
  });
});

$(".btn-sign-out").click(function () {
  $("#general, #waiting, #transferUI, #withdrawUI, #depositUI, #topbar").hide();
  $("body").removeClass("active");
  $.post("http://new_banking/NUIFocusOff", JSON.stringify({}));
});

$(".back").click(function () {
  $("#depositUI, #withdrawUI, #transferUI").hide();
  $("#general").show();
});

$("#deposit").click(function () {
  $("#general").hide();
  $("#depositUI").show();
});

$("#withdraw").click(function () {
  $("#general").hide();
  $("#withdrawUI").show();
});

$("#transfer").click(function () {
  $("#general").hide();
  $("#transferUI").show();
});
$("#invest").click(function () {
  $("#general").hide();
  $.post("http://new_banking/invest", JSON.stringify({}));
});

$("#fingerprint-content").click(function () {
  $(".fingerprint-active, .fingerprint-bar").addClass("active");

  setTimeout(function () {
    $("#general").css("display", "block");
    $("#topbar").css("display", "flex");
    $("#waiting").css("display", "none");
    $(".fingerprint-active, .fingerprint-bar").removeClass("active");
  }, 1400);
});

$("#deposit1").submit(function (e) {
  e.preventDefault(); // Prevent form from submitting
  $.post(
    "http://new_banking/deposit",
    JSON.stringify({
      amount: $("#amount").val(),
    })
  );
  $("#depositUI").hide();
  $("#general").show();
  $("#amount").val("");
});

$("#transfer1").submit(function (e) {
  e.preventDefault(); // Prevent form from submitting
  $.post(
    "http://new_banking/transfer",
    JSON.stringify({
      to: $("#to").val(),
      amountt: $("#amountt").val(),
    })
  );
  $("#transferUI").hide();
  $("#general").show();
  $("#amountt").val("");
});

$("#withdraw1").submit(function (e) {
  e.preventDefault(); // Prevent form from submitting
  $.post(
    "http://new_banking/withdrawl",
    JSON.stringify({
      amountw: $("#amountw").val(),
    })
  );
  $("#withdrawUI").hide();
  $("#general").show();
  $("#amountw").val("");
});

document.onkeyup = function (data) {
  if (data.which == 27) {
    $(
      "#general, #waiting, #transferUI, #withdrawUI, #depositUI, #topbar"
    ).hide();
    $("body").removeClass("active");
    $.post("http://new_banking/NUIFocusOff", JSON.stringify({}));
  }
};