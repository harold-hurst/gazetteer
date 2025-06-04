$(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(1000)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
});

$(document).ready(function () {

    $.ajax({
        url: "libs/php/getCountryNames.php",
        type: "GET",
        dataType: "json",
        // data: {
        //   lat: $("#setLat1").val(),
        //   lng: $("#setLong1").val(),
        //   api: 'timezone',
        // },
        success: function (result, status, xhr) {
          console.log(JSON.stringify(result));
  
        //   if (result.status.name == "ok") {
        //     const offset = result.data?.gmtOffset;
        //     const timezone = result.data?.timezoneId;
        //     const country = result.data?.countryName;
  
        //     if (
        //       offset !== undefined &&
        //       timezone !== undefined &&
        //       country !== undefined
        //     ) {
        //       $("#result-container").html(
        //         `<span> The offset is: GMT+${offset} hour</span><br /><span> The timezone is: ${timezone}</span><br /><span> The country is: ${country}</span>`
        //       );
        //     } else {
        //       $("#result-container").html(
        //         `<span>No time zone information found here.</span>`
        //       );
        //     }
        //   }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", error);
        },
      });

});