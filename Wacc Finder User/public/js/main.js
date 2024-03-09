/**
 * Mobile Navigation
 */

(function mobileFooter(i18n) {
  var i18n = i18n ? i18n : { current: "current" },
    navs = document.querySelectorAll("nav.mobile-footer");
  [].forEach.call(navs, function (nav, index) {
    var a = 0,
      c = 0,
      i = 1, // active, current, increment
      links = nav.getElementsByTagName("a"),
      line = nav.querySelector(".line");
    if (!line) {
      line = document.createElement("i");
      line.setAttribute("aria-hidden", true);
      line.className = "line";
      line.innerHTML = i18n.current;
      nav.appendChild(line);
    }
    line.id = "nav-current" + index;
    if (!line.innerHTML.length) line.innerHTML = i18n.current;
    [].forEach.call(links, function (link, index) {
      link.removeAttribute("aria-describedby");
      if (link.className.match(/\bactive\b/g)) place(line, link);
      link.addEventListener("click", function (e) {
        a = index;
        var t = setInterval(function () {
          links[c].classList.remove("traversing");
          links[c].classList.remove("active");
          if (a > c) i = 1;
          else if (a < c) i = -1;
          c += i;
          links[c].classList.add("traversing");
          if (c != -1) {
            links[c - i].classList.remove("active");
          }
          if (c == a) {
            e.target.classList.remove("traversing");
            e.target.classList.add("active");
            i = 0;
            clearInterval(t);
          }
        }, 100); // Traversing hilite: min: 100ms
        place(line, e.target);
      });
    });
  });
  function place(l, a) {
    a.setAttribute("aria-describedby", l.id || "nav-current");
    l.style.width = a.offsetWidth + "px";
    l.style.left = a.offsetLeft + a.offsetWidth / 2 + "px";
  }
})();

/**
 * Sticky Header
 */
// Check if the element with ID 'main_header' exists before adding scroll event listener
if (document.getElementById("main_header")) {
  window.addEventListener("scroll", function () {
    var header = document.getElementById("main_header");
    var scrollPosition = window.scrollY;

    // Add or remove 'fixed' class based on scroll position
    if (scrollPosition > 1) {
      // Example threshold, adjust as needed
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

// Function to get user initials
function getUserInitials(name) {
  var initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}

// Function to validate email address format
function isValidEmail(email) {
  var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

$(document).ready(function () {
  /**
   * Login Page Script
   */
  if ($("#login").length > 0) {
    // Function to validate email using regex
    function validateEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    // Function to add error display
    function addError(element, message) {
      element.addClass("error-input");
      element.next(".error-message").remove(); // Remove existing message to prevent duplicates
      var errorMessage = $('<div class="error-message">' + message + "</div>");
      element.after(errorMessage);
    }

    // Function to remove error display
    function removeError(element) {
      element.removeClass("error-input");
      element.next(".error-message").remove();
    }

    // Attach click event handler to the button
    $("#signin").click(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-input").removeClass("error-input");
      $(".error-message").remove();

      // Get input values
      var email = $('input[name="email"]').val().trim();
      var password = $('input[name="password"]').val().trim();

      var isValid = true;

      // Validate Email
      if (email.length === 0) {
        addError($('input[name="email"]'), "Please enter an email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        addError(
          $('input[name="email"]'),
          "Please enter a valid email address."
        );
        isValid = false;
      }

      // Validate Password
      if (password.length < 8) {
        addError(
          $('input[name="password"]'),
          "Your password must be at least 8 characters long."
        );
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
        // Perform form submission
        // For example:
        // $('#loginForm').submit();
      }
    });
  }

  /**
   * Security Page Script
   */
  if ($("#security").length > 0) {
    $("form").submit(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-input").removeClass("error-input");
      $(".error-message").remove();

      // Get form inputs
      var currentPassword = $('input[name="current_password"]').val().trim();
      var newPassword = $('input[name="password"]').val().trim();
      var confirmPassword = $('input[name="password_confirmation"]')
        .val()
        .trim();

      var isValid = true;

      // Validate Current Password
      if (currentPassword.length === 0) {
        addError(
          $('input[name="current_password"]'),
          "Please enter your current password."
        );
        isValid = false;
      }

      // Validate New Password
      if (newPassword.length < 8) {
        addError(
          $('input[name="password"]'),
          "Your new password must be at least 8 characters long."
        );
        isValid = false;
      }

      // Validate Password Confirmation
      if (confirmPassword !== newPassword) {
        addError(
          $('input[name="password_confirmation"]'),
          "Passwords do not match."
        );
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
      }
    });

    // Function to add error display
    function addError(element, message) {
      element.addClass("error-input");
      var errorMessage = $('<div class="error-message">' + message + "</div>");
      element.after(errorMessage);
    }
  }

  /**
   * Business Info Page Script
   */
  if ($("#business-information").length > 0) {
    $("#business-info-form").validate({
      rules: {
        bussiness_name: {
          required: true,
        },
        organization_type: {
          required: true,
        },
        bussiness_type: {
          required: true,
        },
        no_employment: {
          required: true,
        },
        bussiness_industry: {
          required: true,
        },
      },
      messages: {
        bussiness_name: {
          required: "Please enter your business name",
        },
        organization_type: {
          required: "Please select an organization type",
        },
        bussiness_type: {
          required: "Please select a business stage",
        },
        no_employment: {
          required: "Please select the number of employees",
        },
        bussiness_industry: {
          required: "Please select a business industry",
        },
      },
      submitHandler: function (form) {
        form.submit();
      },
    });
  }

  /**
   * Custom Avatar Creation
   */
  if ($("#account")) {
    // Get user's full name from the element with class "full-name"
    var fullName = $(".full-name").text();

    // Get user initials
    var initials = getUserInitials(fullName);

    // Create image element with initials as text
    var img = $('<div class="pp"></div>').text(initials);

    // Append image to the div with id "avatar"
    $("#pp").append(img);
  }

  /**
   * Show/Hide Password
   */
  if ($(".inpt-pass")) {
    $(".sh").click(function () {
      var $input = $(this).prev("input");
      var $form_group = $(this).closest(".form-group.inpt-pass");
      if ($input.attr("type") === "password") {
        $input.attr("type", "text");
        $(this).text("Hide");
        $form_group.addClass("show");
      } else {
        $input.attr("type", "password");
        $(this).text("Show");
        $form_group.removeClass("show");
      }
    });
  }

  /**
   * Phone Number Input
   */
  if ($("#phone").length > 0) {
    var input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/js/utils.js",
      separateDialCode: true,
      showSelectedDialCode: true,
      allowDropdown: true,
      showFlags: false,
    });

    // store the instance variable so we can access it in the console e.g. window.iti.getNumber()
    window.iti = iti;
  }

  /**
   * Profile Form Validation
   */
  if ($("#profile-form").length > 0) {
    $("#profile-form").submit(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-message").text("");
      $(".form-control").removeClass("error-input");

      // Get form inputs
      var name = $("#name").val().trim();
      var occupation = $("#occupation").val().trim();
      var phone = $("#phone").val().trim();
      var email = $("#email").val().trim();

      var isValid = true;

      // Validate Name
      if (name === "") {
        $("#name").addClass("error-input");
        $("#name-error").text("Please enter your name.");
        isValid = false;
      }

      // Validate Occupation
      if (occupation === "") {
        $("#occupation").addClass("error-input");
        $("#occupation-error").text("Please select your occupation.");
        isValid = false;
      }

      // Validate Phone Number
      if (phone === "") {
        $("#phone").addClass("error-input");
        $("#phone-error").text("Please enter your phone number.");
        isValid = false;
      }

      // Validate Email Address
      if (email === "") {
        $("#email").addClass("error-input");
        $("#email-error").text("Please enter your email address.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        $("#email").addClass("error-input");
        $("#email-error").text("Please enter a valid email address.");
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
      }
    });
  }
});
