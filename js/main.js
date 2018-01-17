$(function() {

// MODEL
  var model = {
    adminView: false,
    selectedCat: null,
    cats: [],
    addClicks: function() {
      var selectedCat = this.selectedCat.id;
      this.cats.forEach(function(cat) {
        if (cat.id === selectedCat) {
          cat.clicks += 1;
        }
      })
    },
    updateCatData: function(name, imageUrl, clicks) {
      var newCatData = {
        id: this.selectedCat.id,
        name: name,
        imageUrl: imageUrl,
        clicks: Number(clicks) || this.selectedCat.clicks
      };
      this.cats[this.selectedCat.id] = newCatData;
      this.selectedCat = newCatData;
    }
  }

// OCTOPUS
  var octopus = {
    init: function() {
      model.cats.push({id: 0,name: "Scaredy", imageUrl: "./imgs/cat.jpg", clicks: 0});
      model.cats.push({id: 1,name: "Cat", imageUrl: "./imgs/cat2.jpg", clicks: 0});
      model.cats.push({id: 2,name: "Kitty", imageUrl: "./imgs/cat3.jpg", clicks: 0});
      model.cats.push({id: 3,name: "Boo", imageUrl: "./imgs/cat4.jpg", clicks: 0});
      model.cats.push({id: 4,name: "Cats", imageUrl: "./imgs/cat5.jpg", clicks: 0});
      catNav.init();
      view.init();
      adminView.init();
    },

    currentCat: function(cat) {
      model.selectedCat = cat;
      view.render();
    },

    getAllCats: function() {
      return model.cats;
    },

    getCatData: function() {
      return model.selectedCat;
    },

    updateClicks: function() {
      model.addClicks();
      view.render()
    },

    catData: function(name, imageUrl, clicks) {
      if (!model.selectedCat) {
        alert("Please select a cat");
      } else {
        model.updateCatData(name, imageUrl, clicks);
        catNav.render();
        view.render();
      }
    }
  }

  var catNav = {
    init: function() {
      this.$catNav = $("#catNav");
      this.render();
    },
    render: function() {
      this.$catNav.html('');
      octopus.getAllCats().forEach(function(cat) {
        $("#catNav").append($('<li>').text(cat.name).on('click', function() {
          octopus.currentCat(cat);
          $("#header").hide();
          $("li").removeClass("selected");
          $(this).addClass("selected")
        }));
      })
    }
  }

// VIEW
  var view = {
    init: function() {
      this.$catView = $("#catView");
      this.$catClick = $("#cat");
    },
    render: function() {
      var catData = octopus.getCatData()
      var htmlStr = ''
      var clickPluralize = catData.clicks <= 1 ? "click" : "clicks";
      var comment = catData.clicks === 30 ? "Aren't you tired yet?!?!" : "";
      this.$catView.html('')
      htmlStr = '<div class="cat inline-images">' +
        '<h2 id="catName">Name: '+ catData.name +'</h2>' +
        '<img id="cat" src="' + catData.imageUrl +'" alt="cat">' +
        '<span><h3>Clicks: </h3></span>' +
        '<h3 id="counter">'+ catData.clicks + " " + clickPluralize +'</h3>' +
        '<h4 id="comment">'+ comment +'</h4>' +
        '</div>'
      this.$catView.html(htmlStr);

      $("#cat").on("click", function() {
        $("#header").hide();
        octopus.updateClicks();
      })
    }
  }

  function clearValues() {
    $("#name").val('');
    $("#picture").val('');
    $("#clicks").val('');
  }

  var adminView = {
    init: function() {
      this.$adminButton = $("#adminButton");
      this.$adminView = $("#adminView");
      var that = this;
      this.$adminButton.on('click', function(e) {
        clearValues();
        that.$adminView.toggle();
        that.$adminButton.toggle();
      });

      $("#cancelButton").on('click', function(e) {
        clearValues();
        $("#adminView").toggle();
        that.$adminButton.toggle();
      });
      this.render();
    },
    render: function() {
      var that = this;
      $("#catFormSubmit").submit(function(e) {
        e.preventDefault();
        octopus.catData($("#name").val(), $("#picture").val(), $("#clicks").val());
        clearValues();
        that.$adminView.toggle();
        that.$adminButton.toggle();
      })
    }
  }

  octopus.init()
}())
