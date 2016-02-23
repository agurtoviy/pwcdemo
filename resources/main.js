//
// Main JavaScript/JQuery code
//
$(document).ready(function () {

    $.ajaxSetup({
        headers: { 'x-custom-header': 'pwc-mytaxpartner' }
    });

    //
    //Tabs
    //

    $('.accountTabs ul, .searchResults ul, .onPage ul').idTabs();


    // For contact us page
    if (typeof ContactUsAgreeToTerms != "undefined"){
        // Disable submit button
        $("#contactUsSubmitButton").attr("disabled", true);
        $("#contactUsAgreeCheckbox").data("clickedOnce", 0);
        var Form_Comments = $("#Form_Comments");
        Form_Comments.val("Registration Request");
        // Attach change event to track
        $("#contactUsAgreeCheckbox").change(function () {
            var checkbox = $(this);
            var checked = checkbox.is(":checked");
            var clickedOnce = checkbox.data("clickedOnce");
            if (checked) {
                if (clickedOnce == 0) {
                    checkbox.data("clickedOnce", 1);
                    var Form_Comments = $("#Form_Comments");
                    // append to textarea
                    var nowDate = new Date();
                    var currentVal = Form_Comments.val();
                    Form_Comments.val(currentVal + "\n\r[I accept the terms and conditions : " + nowDate.toLocaleString() + "]");
                }

                $("#contactUsSubmitButton").removeAttr("disabled");
            }
            else {
                $("#contactUsSubmitButton").attr("disabled", true);
            }

        });
    }

    //
    //Toggle Buttons For Grid / List view
    //

    $('#registration-form').on('keyup keypress', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            return false;
        }
    });

    $('.toggleButton').each(function () {
        $(this).children().on('click', function () {

            // Do not toggle if this is the selected class!
            if( ! $(this).hasClass('selected') )
            {
                $(this).siblings().toggleClass('selected');
                $(this).toggleClass('selected');
                $('.toggleButtonSection').toggle();
            }

            return false;
        });
    });

    //
    //Close Notifications
    //

    $('.notification').each(function () {
        $(this).find('a').on('click', function () {
            $(this).parent().parent().slideUp();
            return false;
        });
    });

    //
    //Toggle to open and close the options section of posts
    //

    function optionsToggleOnPost() {

        $('#contentwrapper').on('click', '.optionsToggle', function () {

            $(this).toggleClass('active').next().toggleClass('open');

            return false;

        });

    }
    optionsToggleOnPost();


    //
    //Change back button text to back
    //

    var oldText = $('.backbutton a').text();

    function changeBackButtonTextToBack() {

        $('.backbutton a').each(function () {

            if ($(window).width() <= 768) {
                $(this).text('Back');
            }
            else {
                $(this).text(oldText);
            }

        });

    }
    changeBackButtonTextToBack();

    $(window).resize(function () {
        changeBackButtonTextToBack();
    });

    //
    //Set inner scroll width
    //

    function setInnerScrollerWidth() {

        $('.mobileScrollerInner ').each(function () {

            var count = $(this).children().length;

            if ($(window).width() <= 569) {

                $(this).css('width', (287 * count) + 'px');

            }
            else {
                $(this).css('width', '100%');
            }


            if (count == 2) {
                $(this).children().addClass('onlyTwo');
            }
            else if (count == 1) {
                $(this).addClass('onlyOneChild');
                $(this).children().addClass('onlyOne');
            }

        });

    }
    setInnerScrollerWidth();

    $(window).resize(function () {
        setInnerScrollerWidth();
    });

    //
    //Reply to comment Box slide out
    //

    function replyToComment() {

        $('.replyToCommentButton').each(function () {

            $(this).on('click', function () {

                return false;

            });

        });

    }
    replyToComment();

    //upload profile image
    $(".uploadProfImage").click(function () {
        // trigger file input
        $('.profilePictureUploadInput').click();

    });

    //
    //Change file name of input
    //

    $('.uploadButton').change(function () {

        var fileVal = $(this).val();

        $('.uploadFile').val(fileVal);

    });

    //
    //Disable button if accept terms checkbox is not checked
    //

    function checkIfTermsAreAccepted() {
        if ($('.acceptTermsCheckbox').is(':checked')) {
            $('#register-member-submit').prop("disabled", false);
        }
        else {
            $('#register-member-submit').prop("disabled", true);
        }
    }
    checkIfTermsAreAccepted();

    $('.acceptTermsCheckbox').on('click', function () {
        checkIfTermsAreAccepted();
    });

    //
    //Save profile image photo from modal
    //

    var isSubmitting;

    $('.saveProfilePhoto').on('click', function () {
        if (!isSubmitting) {
            isSubmitting = true;
            $('#uploadAvatar').submit();
        }
        return false;
    });

    //
    //Sticky Heros
    //

    function stickyHeros() {

        //Initialise the sticky element
        $('.pageHero.article').sticky({
            topSpacing: 0,
            className: 'sticky',
        });

        //Get the original height of the div for reset
        var resetHeight = $('.pageHero.article').outerHeight();

        //Make the content top offset height the same size of the hero
        $('.pageHero.article').on('sticky-start', function () {
            setTimeout(function () {
                var theHeight = $('.sticky .pageHero').height();
                $('.sticky-wrapper').css('height', theHeight);
            }, 0);
        });

        //reset the height
        $('.pageHero.article').on('sticky-end', function () {
            $('.sticky-wrapper').css('height', resetHeight);
        });

    }
    //stickyHeros();

    //
    //This shows and hides the header when scrolling up / down
    //
    var theHeader = 0;
    var windowScrollTop = 0;

    function windowScroll()
    {
        var newWindowScrollTop = $(window).scrollTop();
        

        if (newWindowScrollTop > theHeader) {
            //if the search results are displayed then we dont add the scrolled height to the nav
            if (!$('.searchResults').is(':visible')) {
                $('header').addClass('hidden');
                if ($(window).width() > 768) {
                    $('header').addClass('scrolledHeight');
                }
            }
        }
        else {
            $('header').removeClass('hidden');
            $('header').removeClass('scrolledHeight');
        }

        if (newWindowScrollTop >= windowScrollTop) {
            //if the search results are displayed then we dont hide the nav
            if (!$('.searchResults').is(':visible')) {
                $('header').removeClass('shown');
            }
        }
        else {
            $('header').addClass('shown');
        }

        windowScrollTop = $(window).scrollTop();
    }
   
    function scrollingChanges() {

        theHeader = $('header').outerHeight();
        $('body').css('margin-top', theHeader);

        windowScrollTop = $(window).scrollTop();

        $(window).scroll(function () {
            windowScroll();
        });

        windowScroll();
    };

    scrollingChanges();
    
    $(window).resize(function () {
        windowsize = $(window).width();
        if ((windowsize > 760) && (windowsize < 769)) {
            //theHeader = $('header').outerHeight();
            $('body').css('margin-top', 120);
        }
        else if (windowsize <= 760) {
            $('body').css('margin-top', 60);
        } else {
            //added fixed height to correct offset bug caused by 'scrolledHeight' overlapping in hero
            $('body').css('margin-top', 134);
        }
    });


    //
    //Responsive Menu
    //

    //
    //Set up the offsets for the responsive menu 
    //

    function responsiveMenuOffset() {

        var theHeader = $('header').outerHeight();

        if ($(window).width() <= 768) {

            $('.responsiveMenu').css('top', theHeader);

        }

    }
    responsiveMenuOffset();

    $(window).resize(function () {

        responsiveMenuOffset();

    });

    $(window).scroll(function () {

        responsiveMenuOffset();

    });

    //
    //Open and close the menu
    //

    $('.pwc-reveal').on('click', function () {

        if ($(window).width() <= 768) {

            $('.responsiveMenu').slideToggle();

            $('.opacityOverlay').fadeToggle();

            $('header').toggleClass('superGlued');

            return false;

        }

    });

    //
    //Open and close the search on mobile
    //

    $('.searchPanelReveal').on('click', function () {
        //check to prevent search menu and nav menu being open at the same time
        if ($('.responsiveMenu').css('display') == 'block') {
            $('.responsiveMenu, .opacityOverlay').toggle();
            mobileShowMoreButtonWrapper.addClass('hidden');
        }
        $(this).toggleClass('close');
        $('.searchPanel, .pwc-reveal, .opacityOverlay').toggle();
        //check to re-enable scrolling when closing menu
        if ($('body').hasClass('removeBodyScroll')) {
            $('body').removeClass('removeBodyScroll');
        }

        return false;

    });



    //
    //Date Pagination Accordion
    //

    $('.datePagination').find('.accordionToggle').click(function () {

        //Expand or collapse this panel
        $(this).next().slideToggle('fast');

        //Hide the other panels
        $(".accordionContent").not($(this).next()).slideUp('fast');

    });

    //
    //Show / Hide Date Pagination
    //

    function showHideDatePaginationOnMobile() {

        $('.datePaginationToggle').on('click', function () {


            if ($(window).width() <= 1100) {

                $('.datePagination').toggleClass('open');

            }

            return false;

        });

        $('.datePagination .mobileClose').on('click', function () {

            if ($(window).width() <= 1100) {

                $('.datePagination').removeClass('open');

            }

            return false;

        });

    }
    showHideDatePaginationOnMobile();

    //
    //Initialise the nice scrolling on the accordion
    // 

    $('.datePagination .accordionContent').niceScroll();

    //
    //Find the siblings of the selected date on the Date Pagination
    //

    function findActiveDateSiblings() {

        var current = $('.datePagination li ul li.active'),
        next = current.nextAll(':lt(2)'),
        prev = current.prevAll(':lt(2)'),
        all = current.add(next).add(prev);

        all.addClass('activeSibling');

        current.removeClass('activeSibling');

    }
    findActiveDateSiblings();


    //
    //Call Turn Tabs Mobile Function
    //

    turnTabsMobile();

    $(window).resize(function () {

        turnTabsMobile();

    });

    var leftButtonClickI = 0;

    $('.searchResults  .rightButton').on('click', function () {
        if (totalWidthOfTabs == ((leftButtonClickI + 1) * 100)) {
            return false;
        }
        else {
            newPosition = ((leftButtonClickI + 1) * 100) * -1;
            if (newPosition == -300) {
                $('.searchResults  .rightButton').addClass('endpoint');
            }
            $('.tabNav, .resultsList').css('left', newPosition + '%');
            leftButtonClickI++;
            $('.searchResults  .leftButton').removeClass('endpoint');
            return false;
        }
    });

    $('.searchResults  .leftButton').on('click', function () {
        if (leftButtonClickI > 0) {
            leftButtonClickI = leftButtonClickI - 1;
            $('.searchResults  .rightButton').removeClass('endpoint');
        }
        if (leftButtonClickI < 0) {
            return false;
        }
        else {
            newPosition = (leftButtonClickI * 100) * -1;
            $('.tabNav, .resultsList').css('left', newPosition + '%');
            if (newPosition == 0) {
                $('.searchResults  .leftButton').addClass('endpoint');
            }
            return false;
        }
    });

    $('.showMoreContentButton').on('click', function (e) {

        e.preventDefault();

        $(this).hide();

        $('.showMoreContent').addClass('expanded');

    });




    //setBackgroundImage();


    //
    //Style the select menu
    //

    function initJquerySelectMenu() {
        if ($(window).width() > 768) {
            $('.selectList').selectmenu();
            if (typeof window.topicLoadAndFilter !== 'undefined') {
                window.topicLoadAndFilter.recache(true);
            }
        }
    }

    function removeJquerySelectMenu() {
        if (($(window).width() <= 768) && ($(".selectList").selectmenu().length != 0)) {
            $(".selectList").selectmenu("destroy");
            if (!window.topicLoadAndFilter == 'undefined') {
                window.topicLoadAndFilter.recache();
            }
        }
    }

    initJquerySelectMenu();


    //
    //Style the mulitselectmenu
    //

    function initJqueryMultiselectMenu() {
        if ($(window).width() > 768) {
            $("#selecttaxonomyindustry").multiselect({
                header: false,
                appendTo: ' .mutliWrapperOne'
            });
            $("#selecttaxonomyregion").multiselect({
                header: false,
                appendTo: ' .mutliWrapperTwo'
            });
            $("#selecttaxonomytaxtype").multiselect({
                header: false,
                appendTo: ' .mutliWrapperThree'
            });

            prepopulateSelectOptions();
        }

    }

    initJqueryMultiselectMenu();


    //
    //Prepopulate the mulitselectmenu with any applicable select options
    //

    function prepopulateSelectOptions() {
        //find selected items for each multiselect
        var selectedItemsOne = $("#selecttaxonomyindustry").multiselect('getChecked');
        var selectedItemsTwo = $("#selecttaxonomyregion").multiselect('getChecked');
        var selectedItemsThree = $("#selecttaxonomytaxtype").multiselect('getChecked');
        //add active classes to these items' parents (adds styling)
        selectedItemsOne.parent().addClass('active');
        selectedItemsOne.parents().addClass('active');
        selectedItemsTwo.parent().addClass('active');
        selectedItemsTwo.parents().addClass('active');
        selectedItemsThree.parent().addClass('active');
        selectedItemsThree.parents().addClass('active');
    }


    //
    //Remove jQuery select menus on mobile
    //

    function removeJqueryMultiSelectMenu() {
        if (($(window).width() <= 768) && ($(".ui-multiselect-checkboxes").length != 0)) {
            $("#selecttaxonomyindustry, #selecttaxonomyregion, #selecttaxonomytaxtype").multiselect("destroy");
        }
    }

    function debouncer(func, timeout) {
        var timeoutID, timeout = timeout || 200;
        return function () {
            var scope = this, args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    }

    $(window).resize(debouncer(function (e) {
        initJquerySelectMenu();
        initJqueryMultiselectMenu();
        removeJquerySelectMenu();
        removeJqueryMultiSelectMenu();
    }));

    var likeContentButton = new LikeContentButton($('#like-content'));
    var search = new Search($('.searchPanel'));
    var resendVerificationEmail = new ResendVerificationEmail();

    // assigned to window so methods can be called from AjaxOptions.OnSuccess property in forms within views
    window.profilePersonalDetailsForm = new ProfilePersonalDetailsForm();
    window.createTopicFromContent = new CreateTopicFromContent($('#create-topic-from-content'));
    window.profileTaxonomiesForm = new ProfileTaxonomiesForm();
    window.memberRegistrationForm = new MemberRegistrationForm();
    var poll = new Poll();


    //
    //Clear input placeholders on mouse enter
    //

    $('input, .styledInput').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
        $(this).attr('placeholder', '');
    });
    $('input, .styledInput').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });


    //
    //Internal scroll top anchors (desktop private)
    //

    $(document).on('click', '[role="scroll-to-element"]', function (event) {
        var scrollToElem = $(this).attr('data-element');
        var elem = $('#' + scrollToElem);
        var theScrollTop = elem.position().top - 20;

        $(' html,body').animate({
            scrollTop: theScrollTop
        }, 1500, function () {
            //animate scroll                
        });
        event.preventDefault();
    });


    //
    //Internal scroll top anchors (desktop public)
    //

    $(document).on('click', '[role="prompt-login"]', function (event) {
        $('#toolsModal').modal('show');
        event.preventDefault();
    });

    $(document).on('click', '[role="siteminderid-yes"]', function (event) {
        $('#toolsModal.siteMinderYes').modal('show');
        event.preventDefault();
    });

    $(document).on('click', '[role="siteminderid-no"]', function (event) {
        $('#toolsModal.siteMinderNo').modal('show');
        event.preventDefault();
    });

    //
    //Scroll top dropdown anchors (mobile public and private)
    //

    $(".selectList.toolsListing").on("change", function () {
        var currentoption = $(this).val();
        if ($(this).children(':selected').attr('role') == "scroll-to-element") {
            $('html, body').animate({
                scrollTop: $("#" + currentoption).offset().top
            }, 1500);
        } else if ($(this).children(':selected').attr('role') == "prompt-login") {
            $('#toolsModal').modal('show');
        }
    });

    //
    //Clear the search input field on click of clear button
    //

    $('.clearInputButton').on('click', function () {
        $('#search').val('Type here to search...');
    });


    //
    //Set up taxonomy filtering
    //

    handleTaxonomyFiltering();

    //
    //Update the label to have the filename from 
    //the input on profile picture upload section
    //

    $('.profilePictureUploadInput').on('change', function() {
        var fileName = $(this).val();
        $(this).prev('p').html(fileName);
    });

    externalSearchDownload();

    //
    //Hide / show the advanced filters area
    //

    var advancedFilterVisible = false;
    var filterOptions = $("#filter-options");
    var filterToggle = $("#filter-toggle");
    filterOptions.css({ 'max-height': 0 })
    filterToggle.addClass("closed");

    filterToggle.click(function (e) {

        if(advancedFilterVisible)
        {
            filterOptions.animate({ 'max-height': 0 }, 300);
            filterToggle.addClass("closed").removeClass("open");
            advancedFilterVisible = false;
        }
        else {
            filterOptions.animate({ 'max-height': 200 }, 300);
            filterToggle.addClass("open").removeClass("closed")
            advancedFilterVisible = true;
        }

        e.preventDefault();
    });

    //
    // Smooth internal bookmark linking (scrolling) 
    //

    $('a[href^="#"]').on('click', function (event) {

        var target = this.href;

        if (target.length) {

            if (target.indexOf("#") > -1)
            {
                var theHash = target.split("#")[1];
                var theElement = $("a[name='" + theHash + "']");

                if (theElement.length > 0)
                {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: theElement.offset().top
                    }, 300);
                }

            }
        }
    });

});

//
//Download File if returned in search result
//

function externalSearchDownload() {
    var externalResultSelector = 'li.search-result.external-result';
    $(externalResultSelector).find('*').on('click', function (e) {
        var clicked = $(e.target).closest(externalResultSelector);
        var fileId = clicked.data('fileid');
        downloadCloudDocumnent(fileId);
        e.stopPropagation();
    });
}
    
//
//Remove body scrolling if search overlay is open 
//

function handleBodyScroll() {
    if (($('.searchResults').css('display') == 'block') && (!$('main').hasClass('searchPageMain'))) {
        $('body').addClass('removeBodyScroll');
    } else {
        $('body').removeClass('removeBodyScroll');
    }
}

handleBodyScroll();

var taxonomyArray = [];

function taxonomyFilterView(taxonomy) {
    //Slide down the filtered section
    $('.taxonomyFiltering').slideDown('fast');
    //Double check the filter hasnt been applied twice so we dont output in twice in the UI
    if ($.inArray(String(taxonomy), taxonomyArray) == -1) {
        //Push new taxonomy into array to check later
        taxonomyArray.push(taxonomy);
        //Add the new taxonmy to the UI
        $('.taxonomiesFiltered').append('<p>' + taxonomy + '</p>');
    }
}

//Clear all taxonomy filters
$('.clearFilters, .searchPanel input').on('click keyup', function () {
    //Slide taxonomy filter section up
    $('.taxonomyFiltering').slideUp('fast');
    //Clear prev search array
    taxonomyArray.length = 0;
    //delete all of the shown taxonomies from the UI
    $('.taxonomiesFiltered').html('');
    //Show all of the search results
    $('.search-result').removeClass('hide');
    $('.search-result').addClass('show');
});

function registerContextualiseSearch() {
    var fileName = $('.search-result a');
    fileName.on('click', function () {

        var resultGuid = $(this).data('resultguid');
        var resultSearchContextId = $(this).data('searchcontextid');

        $.ajax({
            type: "POST",
            url: '/umbraco/surface/search/ContextualiseAction/',
            data: {
                resultGuid: resultGuid,
                resultSearchContextId: resultSearchContextId,
                siteMinderId: siteminderId,
                __RequestVerificationToken : $('input[name="__RequestVerificationToken"]', form).val()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log('error with search: ' + errorThrown);
            },
            success: function (data, status, jqXHR) {
                //console.log(data.Result);
            },
            complete: function (jqXHR, textStatus) {
            }
        });
    });
}

//search filter by taxonomy
function handleTaxonomyFiltering() {
    var searchResultRow = $('.search-result');
    var searchResultTaxonomy = $('.searchResultsTaxonomyItem');
    //Fires when clicking on an items taxonomy
    searchResultTaxonomy.on('click', function () {
        //Set taxonomy var to the HTML of the taxonomy link (the taxonomy name)
        var taxonomyItemInfo = $(this).html();
        //Put the taxonomy into the Filtered Taxonomy UI
        taxonomyFilterView(taxonomyItemInfo)
        //Loop through the taxonomy array
        for (var i = 0; i < taxonomyArray.length; i++) {
            //Loop through search items
            searchResultRow.each(function () {
                //if an item doesnt have a taxonomy qual to the one cliked hide it
                if (!$(this).is('[data-taxonomies*=' + taxonomyArray[i] + ']')) {
                    $(this).addClass('hide').removeClass('show');
                }
                    //if it has an equqal taxonomy then we can show it
                else {
                    $(this).addClass('show').removeClass('hide');;
                }
            });
        }
        //update the post count
        updateCount();
    });
}

//
//Turn Tabs Mobile!
//
var totalWidthOfTabs;

function turnTabsMobile() {

    if ($(window).width() <= 569) {

        i = 0;

        $('.searchResults .tabNav ul li').each(function () {

            i++;

        });

        if (i == 1) {
            $('.rightButton, .leftButton').hide();
        }

        //apply a width of 100% / number of tabs to each section
        $('.searchResults .tabNav ul li, .resultsList > div').css('width', (100 / i) + '%');

        //set the sliding containers width: number of tabs * 100%
        totalWidthOfTabs = i * 100;

        $('.searchResults .tabNav, .resultsList').css({
            'width': totalWidthOfTabs + '%',
            'left': '0%',
        });

        $('.showMoreButtonMobile').removeClass('hidden');

    }
    else {

        $('.searchResults .tabNav, .resultsList > div').css('width', 'auto');
        $('.resultsList').css('width', '100%');
        $('.searchResults .tabNav ul li').css('width', '100px');
        $('.showMoreButtonMobile').addClass('hidden');

    }
}


// handle like button on news and tools pages. (wrapper parameter is a jquery object)
function LikeContentButton(wrapper) {
    var self = this;
    self.wrapper = wrapper;
    self.buttonState = self.wrapper.data('state');
    self.gettingData = false;
    self.currentPageId = self.wrapper.find('#page-like-current-page-id').val();
    self.countWrapper = self.wrapper.find('.like-count');
    self.likeText = self.wrapper.find('.like-unlike-text');
    self.userName = self.wrapper.find('#page-like-username').val();
    self.url = '/umbraco/surface/pagelike/togglelike/';
    self.wrapper.on('click', 'a', (function (e) {
        if (self.gettingData !== true) {
            self.toggleLike();
        }
    }));
    self.link;
    self.recacheLink();
}
LikeContentButton.prototype.toggleLike = function () {
    var self = this;
    self.gettingData = true;
    self.link.addClass('disabled').css('text-decoration', 'line-through');
    $.ajax({
        url: self.url,
        data: {
            nodeId: self.currentPageId,
            userName: self.userName
        },
        success: function (data, status, jqXHR) {
            self.countWrapper.html(data);
            if (self.buttonState === 'like') {
                self.buttonState = 'unlike';
                self.likeText.html('Unlike');
                self.wrapper.attr('state', 'unlike');
            } else {
                self.buttonState = 'like';
                self.likeText.html('Like');
                self.wrapper.attr('state', 'like');
            }
        },
        complete: function (jqXHR, textStatus) {
            self.gettingData = false;
            self.recacheLink();
            self.link.removeClass('disabled').css('text-decoration', 'none');
        }
    });
};
LikeContentButton.prototype.recacheLink = function () {
    var self = this;
    self.link = self.wrapper.find('a');
};

// handle search
function Search(wrapper) {
    var self = this;
    self.onSearchPage = typeof onSearchPage !== 'undefined'; // this is a global var output on SearchPage.cshtml
    self.wrapper = wrapper;
    self.input = self.wrapper.find('form #search');
    self.button = self.wrapper.find('form button');
    self.clearButton = self.wrapper.find('.clearInputButton');
    self.resultsWrapper = self.onSearchPage === false ? self.wrapper.find('.searchResults') : $('.searchResults');
    self.resultsPartialWrapper = self.onSearchPage === false ? self.wrapper.find('.resultsList') : $('.searchResults .resultsList');
    self.publicPrivateTag = self.wrapper.find('#search-tag-public-private').val();
    self.url = '/umbraco/surface/search/search/';
    self.registerUrl = '/umbraco/surface/search/registersearch/';
    self.open = self.onSearchPage === true ? true : false;
    self.term = self.input.val();
    self.siteminderId = siteminderId; // ouput by _SearchBar.cshtml view.
    self.searchAreaTag = searchAreaTag; // ouput by _SearchBar.cshtml view.
    self.resultCountElem = $('#result-count');
    self.filter = self.resultsWrapper.find('select');
    mobileShowMoreButtonWrapper = $('.showMoreButtonMobileWrapper');
    self.displaySearchResults = false;

    self.highlightTerm();
    registerContextualiseSearch();

    // handle placeholder and close icon on entry/exit
    self.input.focus(function () {
        self.clearButton.show();
        $('#search').val('');
    });

    // handle enter keypress differently depending on page
    self.input.on('keydown', (function (e) {
        if (e.which === 13 && self.input.val().length > 0) {
            e.preventDefault();
            self.term = self.input.val();
            self.clearButton.addClass('loadingSpinner');

            self.registerSearch(
                self.term,
                {
                    complete : function () { window.location.href = searchPageUrl; }
                });
        }
    }))

    // close and clear search after clicking close button
    self.clearButton.on('click', function () {
        self.term = $(this).val();
        if (self.resultsWrapper.length !== 0 && self.open === true) {
            self.toggleResults();
            self.open = false;
            self.clearButton.hide();
            self.resultCountElem.html('0');
            self.resultsPartialWrapper.html('');
            $('.search-result').removeClass('show').addClass('hide');
            $('.taxonomyNoResultsMessage').addClass('shown').removeClass('hidden');
            $('body').removeClass('removeBodyScroll');
            mobileShowMoreButtonWrapper.addClass('hidden');
        } else {
            self.clearButton.hide();
        }
    });

    self.button.on('click', function () {

        self.term = self.input.val();

        if (self.term.length > 0) {

            self.clearButton.addClass('loadingSpinner');

            self.registerSearch(
                self.term,
                {
                    complete: function () { window.location.href = searchPageUrl; }
                });
        }
    });

    self.handleDropdownFiltering();

}

var performSearchRequest;

Search.prototype.performSearch = function (term) {
    var self = this;

    if (performSearchRequest && performSearchRequest.readystate != 4 && typeof performSearchRequest !== 'undefined') {
        performSearchRequest.abort();
    }

    performSearchRequest = $.ajax({
        url: self.url,
        data: {
            term: term,
            publicPrivateTag: self.publicPrivateTag,
            onSearchPage: self.onSearchPage,
            areaTag: self.searchAreaTag, // this is a global var output on SearchPage.cshtml
            siteminderId: self.siteminderId
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error with search: ' + errorThrown);
        },
        success: function (data, status, jqXHR) {
            if (self.displaySearchResults) {
                self.resultsPartialWrapper.html(data);
                self.resultCountElem.html($('.search-result').length);
                $('.search-result').addClass('show').removeClass('hide');

                $('.clearInputButton').removeClass('loadingSpinner');

                // re-init tabs
                $('.searchResults ul').idTabs();
                turnTabsMobile();

                // highlight term in returned results
                self.highlightTerm();

                //filter results by taxonomy
                handleTaxonomyFiltering();

                //Download file from search result
                externalSearchDownload();

                //register contextualise search action
                registerContextualiseSearch();

                self.displaySearchResults = false;
            }       
        },
        complete: function (jqXHR, textStatus) {
        }
    });
};

var registerSearchRequest;

Search.prototype.registerSearch = function (term, options) {

    var self = this;

    if (registerSearchRequest && registerSearchRequest.readystate != 4 && typeof registerSearchRequest !== 'undefined') {
        registerSearchRequest.abort();
    }

    registerSearchRequest = $.ajax({
        url: self.registerUrl,
        data: {
            term: term,
            areaTag: self.searchAreaTag // this is a global var output on SearchPage.cshtml
        },
        complete: function (jqXHR, textStatus) {

            if (options && options.complete)
                options.complete();
        }
    });
};

Search.prototype.toggleResults = function () {
    if (!$('.searchResults').hasClass('onPage')) {
        var self = this;
        self.resultsWrapper.slideToggle('fast');
        if ($('header').hasClass('scrolledHeight')) {
            $('header').removeClass('scrolledHeight');
        }
    }
};
Search.prototype.highlightTerm = function () {
    var self = this;

    self.resultsWrapper.find('p').each(function () {
        $(this).wrapInTag({
            tag: 'span',
            words: [self.term]
        });
    });
};

Search.prototype.handleDropdownFiltering = function () {
    var self = this;

    self.filter.selectmenu({
        change: function (event, ui) {

            var results = $('.search-result');

            if (ui.item.value === 'all') {
                results.removeClass('hide').addClass('show');
                updateCount();
                return;
            }

            // first hide all 
            results.addClass('hide').removeClass('show');

            // only display results that match the selected location
            results.each(function (i, e) {
                var result = $(e);
                if (result.data('location') === ui.item.value) {
                    result.addClass('show').removeClass('hide');
                }
            });

            updateCount();

        }
    });
}

updateCount = function () {
    var updatedSearchResultRow = $('.search-result.show').length;
    $('#result-count').html(updatedSearchResultRow);
    handleNoResults();
}

//handling no results
handleNoResults = function () {
    var searchResultsTab = $('.resultsTab');
    var noResultsMsg = $('.taxonomyNoResultsMessage');

    searchResultsTab.each(function () {

        var count = 0;

        $(this).children().children().children().each(function () {
            if ($(this).hasClass('show')) {
                count++;
            }
        });

        if (count < 1) {
            $(this).find('.taxonomyNoResultsMessage').addClass('shown').removeClass('hidden');
        } else {
            $(this).find('.taxonomyNoResultsMessage').addClass('hidden').removeClass('shown');
        }
    });

}

// create topics from outside of the forum
function CreateTopicFromContent(wrapper) {
    var self = this;
    self.wrapper = wrapper;
    self.topicNameInput = wrapper.find('#topic-name');
    self.topicContentWrapper = wrapper.find('#topic-content');
    self.postTopicButton = wrapper.find('#post-topic');
    self.cancelButton = wrapper.find('#cancel');
    self.message = wrapper.find('#message');
    self.titleMessage = wrapper.find('#title-message');
    self.postAnotherTopicButton = wrapper.find('#post-another-topic');
    self.viewInForumButton = wrapper.find('#view-in-forum');
    self.cancelButton.click(function (e) {
        self.resetState();
    });
    self.postAnotherTopicButton.click(function (e) {
        self.resetState();
    });
    self.topicNameInput.keyup(function (e) {
        self.handleKeyup();

    });
}
CreateTopicFromContent.prototype.success = function (data) {
    var self = this;
    if (data.Success === true) {
        self.message.html('Comment posted successfully');
        self.viewInForumButton.show();
        self.viewInForumButton.attr('href', data.TopicUrl);
        self.postAnotherTopicButton.show();
        self.cancelButton.hide();
        self.postTopicButton.hide();
        self.topicNameInput.hide();
        self.topicContentWrapper.hide();
        self.titleMessage.html('Thankyou');
        self.wrapper.addClass('success');
    } else {
        self.message.html('Sorry, something went wrong. Please try again.')
    }
};
CreateTopicFromContent.prototype.handleKeyup = function () {
    var self = this;
    if (self.topicNameInput.val().length > 0) {
        self.cancelButton.show();
    } else {
        self.cancelButton.hide();
    }
};
CreateTopicFromContent.prototype.resetState = function () {
    var self = this;
    self.topicNameInput.val('');
    self.cancelButton.hide();
    self.postAnotherTopicButton.hide();
    self.viewInForumButton.hide();
    self.postTopicButton.show();
    self.topicNameInput.show();
    self.topicContentWrapper.show();
    self.titleMessage.html('Discuss this article?');
    self.message.html('Start a conversation within our forum');
    self.wrapper.removeClass('success');
};

// handle editing personal details on profile page
function ProfilePersonalDetailsForm() {
    var self = this;
    self.editBtnClass = 'editButton';
    self.cancelBtnClass = 'cancelButton';
    self.wrapper = $('#details .personal');
    self.editCancelBtn = self.wrapper.find('.' + self.editBtnClass).length > 0 ? self.wrapper.find('.' + self.editBtnClass) : self.wrapper.find('.' + self.cancelBtnClass);
    self.editCancelBtn.click(function (e) {
        e.preventDefault();
        self.toggleState();
    });
    preferencesButtonWrapper = $('.changeAccountPreferencesButtonWrapper');
    self.recache();
    // disable inputs by default
    self.setDisabledState();
}
ProfilePersonalDetailsForm.prototype.toggleState = function () {
    var self = this;
    self.editing = !self.editing;
    if (self.editing === true) {
        self.setEditState();
    } else {
        self.setDisabledState();
    }
};
ProfilePersonalDetailsForm.prototype.setEditState = function () {
    var self = this;
    self.editing = true;
    self.editCancelBtn.addClass(self.cancelBtnClass).removeClass(self.editBtnClass).html('Cancel');
    self.inputs.removeAttr('disabled');
    self.selects.removeAttr('disabled');
    self.selects.selectmenu("enable");
    self.submitBtn.show();
    self.mainCancelBtn.show();
    preferencesButtonWrapper.show();
};
ProfilePersonalDetailsForm.prototype.setDisabledState = function () {
    var self = this;
    self.editing = false;
    self.editCancelBtn.removeClass(self.cancelBtnClass).addClass(self.editBtnClass).html('Edit');
    self.inputs.attr('disabled', 'disabled');
    self.selects.attr('disabled', 'disabled');
    self.selects.selectmenu("disable");
    self.submitBtn.hide();
    self.mainCancelBtn.hide();
};
// recache after our form markup is replaced with new elements
ProfilePersonalDetailsForm.prototype.recache = function () {
    var self = this;
    self.editing = false;
    self.inputs = self.wrapper.find('input.editable');
    self.selects = self.wrapper.find('select');
    self.selects.selectmenu();
    self.submitBtn = self.wrapper.find('button[type="submit"]');
    self.mainCancelBtn = self.wrapper.find('button.cancel');
    self.mainCancelBtn.click(function (e) {
        self.setDisabledState();
    });
    preferencesButtonWrapper = $('.changeAccountPreferencesButtonWrapper');
}
// this method is called when we have submitted the form and we have new markup returned
ProfilePersonalDetailsForm.prototype.onSuccess = function () {
    var self = this;
    self.recache();
    self.setDisabledState();
    // make sure unobtrusive validation handles new markup
    $.validator.unobtrusive.parse(document);
};

// handle editing insights on profile page
function ProfileInsightsForm() {
    var self = this;
    self.editBtnClass = 'editButton';
    self.cancelBtnClass = 'cancelButton';
    self.recache();
    self.setDisabledState();
}
ProfileInsightsForm.prototype.toggleState = function () {
    var self = this;
    self.editing = !self.editing;
    if (self.editing === true) {
        self.setEditState();
    } else {
        self.setDisabledState();
    }
};
ProfileInsightsForm.prototype.setEditState = function () {
    var self = this;
    self.editing = true;
    self.editCancelBtn.addClass(self.cancelBtnClass).removeClass(self.editBtnClass).html('Cancel');
    self.inputs.removeAttr('disabled');
    self.tinyMceWrappers.removeClass('disabled');
    for (var i = 0; i < self.tinyMceBodys.length; i++) {
        $(self.tinyMceBodys[i].getBody()).attr('contentEditable', true)
    }
    preferencesButtonWrapper.show();
    self.submitBtn.show();
    self.mainCancelBtn.show();
};
ProfileInsightsForm.prototype.setDisabledState = function () {
    var self = this;
    self.editing = false;
    self.editCancelBtn.removeClass(self.cancelBtnClass).addClass(self.editBtnClass).html('Edit');
    self.inputs.attr('disabled', 'disabled');
    self.tinyMceWrappers.addClass('disabled');
    for (var i = 0; i < self.tinyMceBodys.length; i++) {
        $(self.tinyMceBodys[i].getBody()).attr('contentEditable', false)
    }
    self.submitBtn.hide();
    self.mainCancelBtn.hide();
};
// recache after our form markup is replaced with new elements
ProfileInsightsForm.prototype.recache = function () {
    var self = this;
    self.editing = false;
    self.wrapper = $('#insights');
    self.inputs = self.wrapper.find('input');
    self.submitBtn = self.wrapper.find('button[type="submit"]');
    self.editCancelBtn = self.wrapper.find('.' + self.editBtnClass).length > 0 ? self.wrapper.find('.' + self.editBtnClass) : self.wrapper.find('.' + self.cancelBtnClass);
    self.mainCancelBtn = self.wrapper.find('button.cancel');
    self.editCancelBtn.click(function (e) {
        e.preventDefault();
        self.toggleState();
    });
    self.mainCancelBtn.click(function (e) {
        self.setDisabledState();
    });

    // bug: when recache() is called from success method after submitting form
    // the tinymce's don't exist on the page yet so we don't actually get them until
    // a new instance of ProfileInsightsForm is created and recache is called from the constructor.
    self.tinyMceWrappers = self.wrapper.find('.tinymceholder');
    self.tinyMceBodys = [];
    for (var i = 0; i < tinymce.editors.length; i++) {
        self.tinyMceBodys.push(tinymce.editors[i]);
    }
}
// this method is called when we have submitted the form and we have new markup returned
ProfileInsightsForm.prototype.onSuccess = function () {
    var self = this;
    self.recache();
    self.setDisabledState();
    // make sure unobtrusive validation handles new markup
    $.validator.unobtrusive.parse(document);
};

// handle editing taxonomies on profile page
function ProfileTaxonomiesForm() {
    var self = this;
    self.editBtnClass = 'editButton';
    self.cancelBtnClass = 'cancelButton';
    self.recache();
    preferencesButtonWrapper = $('.changeAccountPreferencesButtonWrapper');
    // disable inputs by default
    self.setDisabledState();
}
ProfileTaxonomiesForm.prototype.toggleState = function () {
    var self = this;
    self.editing = !self.editing;
    if (self.editing === true) {
        self.setEditState();
    } else {
        self.setDisabledState();
    }
};
ProfileTaxonomiesForm.prototype.setEditState = function () {
    var self = this;
    self.editing = true;
    self.editCancelBtn.addClass(self.cancelBtnClass).removeClass(self.editBtnClass).html('Cancel');
    self.inputs.removeAttr('disabled');
    self.submitBtn.show();
    self.mainCancelBtn.show();
    preferencesButtonWrapper.show();
};
ProfileTaxonomiesForm.prototype.setDisabledState = function () {
    var self = this;
    self.editing = false;
    self.editCancelBtn.removeClass(self.cancelBtnClass).addClass(self.editBtnClass).html('Edit');
    self.inputs.attr('disabled', 'disabled');
    self.submitBtn.hide();
    self.mainCancelBtn.hide();
};
// recache after our form markup is replaced with new elements
ProfileTaxonomiesForm.prototype.recache = function () {
    var self = this;
    self.editing = false;
    self.wrapper = $('#taxonomies-form-target');
    self.inputs = self.wrapper.find('input');
    self.submitBtn = self.wrapper.find('button[type="submit"]');
    self.mainCancelBtn = self.wrapper.find('button.cancel');
    self.editCancelBtn = self.wrapper.find('.' + self.editBtnClass).length > 0 ? self.wrapper.find('.' + self.editBtnClass) : self.wrapper.find('.' + self.cancelBtnClass);
    self.editCancelBtn.click(function (e) {
        e.preventDefault();
        self.toggleState();
    });
    self.mainCancelBtn.click(function (e) {
        self.setDisabledState();
    });
}
// this method is called when we have submitted the form and we have new markup returned
ProfileTaxonomiesForm.prototype.onSuccess = function () {
    var self = this;
    self.recache();
    self.setDisabledState();
};

// handle member registration form
function MemberRegistrationForm() {
    var self = this;
    self.cacheElements();
}
MemberRegistrationForm.prototype.cacheElements = function () {
    var self = this;
    self.wrapper = $('#register-member-form-target');
    self.inputs = self.wrapper.find('input').not('[type="hidden"]');
    self.clearButton = self.wrapper.find('#register-member-reset');
    self.submitButton = self.wrapper.find('button[type="submit"]');
    self.showContactForm = self.wrapper.find('input#ShowContactForm');
    self.promptUserToConfirm = self.wrapper.find('input#PromptUserToConfirm');
    self.validationSummaryErrors = self.wrapper.find('.validation-summary-errors');
    self.contactSection = self.wrapper.find('.contact-section');
    self.registrationSuccessMessage = self.wrapper.find('#registration-success-message');
    self.loadingMessage = self.wrapper.find('#register-member-wait');
    self.clearButton.click(function (e) {
        self.clearForm();
    });
}
MemberRegistrationForm.prototype.clearForm = function () {
    var self = this;
    self.inputs.val('');
    self.showContactForm.val('false');
    self.promptUserToConfirm.val('false');
    self.validationSummaryErrors.hide();
    self.contactSection.hide();
    self.registrationSuccessMessage.hide();
    self.submitButton.show();
}
MemberRegistrationForm.prototype.success = function () {
    var self = this;
    $.validator.unobtrusive.parse(document);
    self.loadingMessage.hide();
    self.cacheElements();
};


// handle polls
function Poll() {
    var self = this;
    self.form = $('form#poll');
    self.memberId = self.form.find('input[type="hidden"]#member-id').val();
    self.industryId = self.form.find('input#industry-id').val();
    self.jobTitle = self.form.find('input#job-title-id').val();
    self.companyId = self.form.find('input#company-id').val();
    self.companySizeId = self.form.find('input#company-size-id').val();
    self.industryId = self.form.find('input#industry-id').val();
    self.pollId = self.form.find('input[type="hidden"]#poll-id').val();
    self.answers = self.form.find('input[type="checkbox"]');
    self.questions = self.form.find('.pollQuestion');
    self.nextButtons = self.form.find('button[type="button"].next');
    self.previousButtons = self.form.find('button[type="button"].previous');
    self.finishButton = self.form.find('button[type="button"].finish');
    self.stageIndicator = $('#stage-indicator');
    self.stageIndicatorNumber = self.stageIndicator.find('span');
    self.chosenAnswerStats = null;
    self.position = 0;
    self.thankyouMessage = $('#poll-thankyou-message');

    // handle finish button to show thankyou message
    self.finishButton.click(function () {
        self.thankyouMessage.show();
        self.form.hide();
        self.stageIndicator.hide();
    });
    
    // handle answer selection
    self.answers.click(function () {
        var chosenAnswer = $(this);
        var chosenAnswerId = $(this).val();
        var chosenAnswerContainer = $(this).closest('.answer-container');
        var question = chosenAnswer.closest('.pollQuestion');
        var questionId = question.data('id');
        var relatedAnswers = question.find('input[type="checkbox"]');
        var nextButton = question.find('button.next');
        var previousButton = question.find('button.previous');
        var finishButton = question.find('button.finish');
        var isFinalQuestion = finishButton.length > 0;
        self.chosenAnswerStats = chosenAnswerContainer.find('.stats');
        
        chosenAnswerContainer.addClass('selected');

        // record answer in db and show statistics
        self.recordAnswer(questionId, chosenAnswerId);

        // prevent user selecting another answer
        relatedAnswers.off('click');
        relatedAnswers.attr('disabled', 'disabled');

        //get stats for other answers
        $(this).parents('div.pollQuestion').find('div.pollAnswer').each(function () {
            var thisAnswer = $(this);
            if (!thisAnswer.hasClass('selected')) {
                thisAnswerId = thisAnswer.find('input[type="checkbox"]').val();
                $.ajax({
                    url: '/umbraco/surface/benchmarking/showanswers',
                    data: {
                        pollId: self.pollId,
                        questionId: questionId,
                        answerId: thisAnswerId,
                        memberId: self.memberId,
                        industryId: self.industryId,
                        companyId: self.companyId,
                        companySizeId: self.companySizeId,
                        jobTitle: self.jobTitle
                    },
                    success: function (data, status, jqXHR) {
                        thisAnswer.find('.stats').html(data);
                        self.chosenAnswerStats.show();
                        $('.statsItem').find('.statsBar').addClass('animate');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        thisAnswer.find('.stats').chosenAnswerStats.html('Sorry, something went wrong. ' + errorThrown);
                    }
                });
                thisAnswer.find('div.answer-description').show();
            }
        });

    });

    // handle next button click
    self.nextButtons.click(function () {
        self.position++;
        self.stageIndicatorNumber.html($(this).find('span').html());
        self.questions.removeClass('active');
        $(self.questions[self.position]).addClass('active');
    });

    // handle next button click
    self.previousButtons.click(function () {
        self.position++;
        self.position = self.position - 2;
        self.stageIndicatorNumber.html($(this).find('span').html());
        self.questions.removeClass('active');
        $(self.questions[self.position]).addClass('active');
    });




}
Poll.prototype.recordAnswer = function (questionId, answerId) {
    var self = this;
    self.chosenAnswerStats.html('Loading...');
    
    $.ajax({
        url: '/umbraco/surface/benchmarking/recordanswer',
        data: {
            pollId: self.pollId,
            questionId: questionId,
            answerId: answerId,
            memberId: self.memberId,
            industryId: self.industryId,
            companyId: self.companyId,
            companySizeId: self.companySizeId,
            jobTitle: self.jobTitle
        },
        success: function (data, status, jqXHR) {
            self.chosenAnswerStats.html(data);
            self.chosenAnswerStats.show();
            $('.statsItem').find('.statsBar').addClass('animate');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            self.chosenAnswerStats.html('Sorry, something went wrong. ' + errorThrown);
        }
    });
};

//
//Show/hide hidden fields registration modal window
//

$('.findCompanyBtn').click(function () {
    $(this).css('display', 'none')
});

// handle resending email verification
function ResendVerificationEmail() {
    var self = this;
    self.wrapper = $('#verification-resend');
    self.linkButton = self.wrapper.find('a');
    self.memberId = self.linkButton.data('memberId');
    self.url = '/umbraco/Surface/VerificationSurface/ResendVerificationEmail?memberId=' + self.memberId;
    self.statusMessage = self.wrapper.find('#verification-status');
    self.linkButton.click(function (e) {
        e.preventDefault();
        self.sendEmail();
    });
}
ResendVerificationEmail.prototype.sendEmail = function () {
    var self = this;
    self.statusMessage.html('Sending...');
    self.statusMessage.show();
    $.ajax({
        url: self.url,
        success: function (data, status, jqXHR) {
            self.statusMessage.html(data);
        }
    });
};


//
//Change button text in registration modal window
//

//$('#register-member-submit').click(function () {
//    $(this).text('Confirm and continue')
//});


//
//Custom video player on tools detail page
//

var toolsPromoVideo = $(".toolsPromoVideo");
var playButton = $(".videoOverlay");

var initVideoControlsEvents = function () {
    
    playButton.bind("touchstart click", function () {
        var specificVideo = $(this).siblings().get(0);
        if (specificVideo.paused) {
            $(this).addClass("hidden");
            toolsPromoVideo.attr("controls", "controls");
            specificVideo.play();
        } else {
            $(this).removeClass("hidden");
            specificVideo.pause();
            toolsPromoVideo.removeAttr("controls")
        }
    })
    
    toolsPromoVideo.bind("touchstart click", function () {
        if (this.paused == false) {
            this.pause();
            playButton.removeClass("hidden");
            toolsPromoVideo.removeAttr("controls")
        } else {
            this.play();
            playButton.addClass("hidden");
            toolsPromoVideo.attr("controls", "controls");
        }
    })

    toolsPromoVideo.on('ended', function () {
        playButton.removeClass("hidden");
    });
    
}

if (toolsPromoVideo.length) {
    initVideoControlsEvents();
}

toolsPromoVideo.bind("touchstart", function () {
    $(this).play();
})

//
//Disable right hand click on video
//

$('.imgVidHolder').bind('contextmenu', function (e) {
    return false;
});

//
//Close cookie message
//

/*if (typeof $.cookie('cookieNotice') === 'undefined') {
   $('.cookieMessage').removeClass('hidden');
}

$('#cookieCloseButton').on('click', function () {
   $.cookie('cookieNotice', 1, {
       expires: 365, // Set a cookie for 1 year
       path: '/'
   });
   $('.cookieMessage').addClass('hidden');
   setTimeout(function () {
       $('.cookieMessage').css('display', 'none');
   }, 100);
});*/


//
//pushes footer to bottom of page on pages with little content
//

if ($(document).height() < 900) {
    $('main').addClass("fullHeightMain");
}


//
//fix for TinyMce cursor bug - sets body height of iframe to 100%
//

//check if TinyMce is present on page
function checkTinyMcePrecence() {
    //wait for tinymce to load
    setTimeout(function () {
        if ($('.tinymceholder').length) {
            handleTinyMceBodyHeight();
        }
    }, 1000);
}

checkTinyMcePrecence();

//set inner body height in frame to 90% (100% adds scrollbar)
function handleTinyMceBodyHeight() {
    //check to see what ID the iframe has
    if (!tinymce.get('PostContent') == 0) {
        var body = tinymce.get('PostContent').getBody();
    } else if (!tinymce.get('TopicContent') == 0) {
        var body = tinymce.get('TopicContent').getBody();
    } else {
    }
    //sets the height
    var html = $(body).parent();
    html.css('height', '100%');
    $(body).css('height', '90%');
}

//
//Search Highlighing
//

$.fn.wrapInTag = function (opts) {

    var tag = opts.tag || 'strong',
        words = opts.words || [],
        regex = RegExp(words.join('|'), 'gi'),
        replacement = '<' + tag + '>$&</' + tag + '>';

    return this.html(function () {
        return $(this).text().replace(regex, replacement);
    });
};

//
//Setting images as BG images on image text blocks
//
//  we do this in jquery for ease of positioning 
//  and for SEO purposes.
//

$(window).resize(function () {
    setMobileBackgroundImage();
})

var setMobileBackgroundImage = function () {

    $('.imgTextBlock.bigImg ').each(function () {
        if ($(window).width() > 569) {
            
            $('.imgTextBlock img.featuredImg').each(function () {

                //get the image source
                var imgUrl = $(this).attr('src');

                //hide the image
                $(this).hide();
                $(this).next('img').hide();

                //set image as a bg image
                $(this).nextAll('.imgHolder').css('background-image', 'url(' + imgUrl + ')');

            });

        }
        else {
            $('.imgTextBlock img.featuredImgMobile').each(function () {

                //get the image source
                var imgUrl = $(this).attr('src');

                //hide the image
                $(this).hide();
                $(this).prev('img').hide();

                //set image as a bg image
                $(this).nextAll('.imgHolder').css('background-image', 'url(' + imgUrl + ')');

            });
        }
    });

}

/*var setBackgroundImage = function () {

    setMobileBackgroundImage();

    $('.imgTextBlock.withBgImg').each(function () {

        //Set the bgimg as a var
        var theBgImg = $(this).children('.bgImg');

        //hide the bg image
        theBgImg.hide();

        //set the image as a background image
        $(this).children('.bgImgHolder').css('background-image', 'url(' + theBgImg.attr('src') + ')');

    });
}*/


function trackRegisterClick() {
    if (dcsMultiTrack) dcsMultiTrack('DCS.dcsuri', '/register-member', 'WT.ti', 'Click!');
    else alert("ERROR: Couldn't find dcsMultiTrack");
}

function downloadCloudDocumnent(fileId) {
    $.ajax({
        type: "POST",
        url: '/umbraco/surface/CloudDocument/GetDocumentUrl',
        data: {
            SiteMinderId: siteminderId,
            FileId: fileId
        },
        success: function (data, status, jqXHR) {
            if (data !== undefined) {
                window.location = data;
            }
        }
    });
}

/*** Script for Drop-Down Button Menu ***/
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropDownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}