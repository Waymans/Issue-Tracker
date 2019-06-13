$(function() {
        var currentProject = window.location.pathname.replace(/\//g, "");;
        var url = "/api/issues/"+currentProject;
        $('#projectTitle').text('All issues for: '+currentProject)
        $.ajax({
          type: "GET",
          url: url,
          success: function(data)
          {
            var issues= [];
            data.forEach(function(ele) {
              var openstatus, bgColor, textColor, textLink, text, issue;
              (ele.open) ? openstatus = 'open' : openstatus = 'closed';
              if (openstatus === 'open') {
                bgColor = 'light';
                textColor = 'dark';
                textLink = 'primary';
                text = 'close';
                issue = 'closeIssue';
              } else {
                bgColor = 'secondary';
                textColor = 'light';
                textLink = 'info';
                text = 'open';
                issue = 'openIssue';
              }
              var status = ele.status_text ? ele.status_text : 'N/A';
              var assign = ele.assigned_to ? ele.assigned_to : 'N/A';
              var single = [
                '<div class="p-0 col-md-4">',
                '<div class="bg-'+bgColor+' text-'+textColor+' border text-left p-2">',
                '<p>id: <em id="num">'+ele._id+'</em> <button id="copy" class="btn-sm btn-dark">Copy</button></p>',
                '<h3>'+ele.issue_title+' -  ('+openstatus+')</h3>',
                '<p><b>Issue:</b> '+ele.issue_text+'</p>',
                '<p><b>Status:</b> '+status+'</p>',
                '<p><b>Created by:</b> '+ele.created_by+'</p><p><b>Assigned to:</b> '+assign+'</p>',
                '<p><b>Created on:</b> '+getDateTime(new Date(ele.created_on))+'</p><p><b>Last updated:</b> '+getDateTime(new Date(ele.updated_on))+'</p>',
                '<a href="#" class="'+issue+' text-'+textLink+'" id="'+ele._id+'">'+text+'?</a> ',
                '<a href="#" class="deleteIssue text-'+textLink+'" id="'+ele._id+'">delete?</a>',
                '</div>',
                '</div>'             
              ];
              issues.push(single.join(''));
            });
            $('#issueDisplay').html(issues.join(''));
          }
        });
        
        $('#newIssue').submit(function(e){
          e.preventDefault();
          $(this).attr('action', "/api/issues/" + currentProject);
          $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function(data) { window.location.reload(true); }
          });
        });
        
        $('#issueDisplay').on('click','.closeIssue', function(e) {
          var url = "/api/issues/"+currentProject;
          $.ajax({
            type: "PUT",
            url: url,
            data: {_id: $(this).attr('id'), open: false},
            success: function(data) { alert(data); window.location.reload(true); }
          });
          e.preventDefault();
        });
        $('#issueDisplay').on('click','.openIssue', function(e) {
          var url = "/api/issues/"+currentProject;
          $.ajax({
            type: "PUT",
            url: url,
            data: {_id: $(this).attr('id'), open: true},
            success: function(data) { alert(data); window.location.reload(true); }
          });
          e.preventDefault();
        });
        $('#issueDisplay').on('click','.deleteIssue', function(e) {
          var url = "/api/issues/"+currentProject;
          $.ajax({
            type: "DELETE",
            url: url,
            data: {_id: $(this).attr('id')},
            success: function(data) { alert(data); window.location.reload(true); }
          });
          e.preventDefault();
        });
        $('#issueDisplay').on('click','#copy', function(e) {
          var $temp = $("<textarea>");
          $("body").append($temp);
          $temp.html($('#num').html()).select();
          document.execCommand("copy");
          $temp.remove();
        });
  function getDateTime(d){
    var time = d.toLocaleTimeString();
    var date = d.toLocaleDateString();
    return date + ' at ' + time;
  }
      });