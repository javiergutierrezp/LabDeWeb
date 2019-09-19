$.ajax({
  url: "https://tc2026daw.github.io/instrucciones/misc/comentarios.xml",
  type: "GET",
  dataType: "xml",
  success: function(data) {
    // console.log(data);
    let new_html = "";

    $(data).find("comment").each(function(event) {
      new_html += `
      <tr>
        <td>${$(this).find("name").text()}</td>
        <td>
          ${$(this).find("stars").text()}         
        </td>
        <td>${$(this).find("date").text()}</td>
        <td>${$(this).find("text").text()}</td>
      </tr>

      `;
    });
    $("#seccion_reviews").append(new_html);
  },
  error: function(error_msg) {
    console.log(error_msg);
  }
});
