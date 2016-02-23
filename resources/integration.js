var toolsListing = (function ($) {

    var $container = $('.js-tools-landing-container');
    var $displayStyle = $container.find('.display-style');
    var $orderSelect = $container.find('#sort-order-selection');
    var $filters = $container.find('.selectList');
    var $dataContainer = $('.toolsLanding .display-style-container');
    var $datePagination = $('ul.datePagination');
    var $filterContainer = $('#toolsContainer');

    initToolClickHandler();

    $dataContainer.on('click', '[data-news-article-url]', function () {
        window.location.href = $(this).data('news-article-url');
    });

    // Update grid display style
    $displayStyle.find('a').click(function () {
        $this = $(this);
        if ($this.length > 0) {
            if ($(this).attr('class') === 'list') {
                showListView();
            }
            else {
                showGridView();
            }
        }
    });

    $filters.on("selectmenuchange blur", function () {
        $filters.filter().each(function () {
            $(this).val('');
        });
        refreshToolsListing();
    });


    //
    //Filter the tools based upon classifications
    //

    var currentFilter = $(".filter-bar li a");

    $(".filter-bar li a").click(function (e) {

        if (currentFilter)
            currentFilter.removeClass("active");

        currentFilter = $(this);
        currentFilter.addClass("active");
        taxonomyFilterView(currentFilter.data("classification"));
        refreshToolsListing();

        e.preventDefault();
    });


    var refreshToolsListing = function (style, append) {
        if (!style)
            style = $displayStyle.find('a.selected').data('display-style');

        var taxonomies = {};

        $filters.each(function () {
            var $this = $(this);
            taxonomies[this.id] = $this.val();
        });

        // Splice in the new quick filter value

        var activeQuickFilter = $(".filter-bar a.active");
        var activeQuickFilterValue = activeQuickFilter.data("classification");
        classificationId = activeQuickFilterValue ? activeQuickFilterValue : 0;

        var data = {
            style: style,
            order: $orderSelect.val(),
            publishedDate: $datePagination.find('li.active').children(':first').data('date'),
            append: (append === true),
            taxonomies: taxonomies,
            classificationId: classificationId
        };

        $.ajax({
            method: 'post',
            url: '/tools',
            data: data,

            success: function (data, status, jqXHR, response) {
                $filterContainer.html(data);
                initToolClickHandler();
            }
        });
    };

    return {
    };
})(jQuery);

var newsListing = (function ($) {
    var $container = $('.js-news-landing-container');
    var $displayStyle = $container.find('.display-style');
    var $orderSelect = $container.find('#sort-order-selection');
    var $filters = $container.find('.selectList');
    var $showMoreButton = $('#show-more-news-items');
    var $datePagination = $('ul.datePagination');
    var $dataContainer = $('#news-landing-row-container');
    var $noResultsMessage = $container.find('.no-results-message');

    $dataContainer.on('click', '[data-news-article-url]', function () {
        window.location.href = $(this).data('news-article-url');
    });

    // Update grid display style
    $displayStyle.find('a').click(function () {
        $this = $(this);
        refreshNewsListing($this.data('display-style'));
    });

    $showMoreButton.click(function () {
        refreshNewsListing(null, true);
    });

    $datePagination.find('span.all-articles').click(function () {
        var $this = $(this);
        $datePagination.find('li').removeClass('active');
        $dataContainer.data('page-number', 1);
        refreshNewsListing();
    });

    // Select news articles for the selected date
    $datePagination.find('a').click(function () {
        var $this = $(this);
        $filters.each(function () {
            $(this).val('');
            $(this).selectmenu('refresh', true);
        });
        $datePagination.find('li').removeClass('active');
        $this.parents('li:first').addClass('active').removeClass('activeSibling');
        $dataContainer.data('page-number', 1);
        refreshNewsListing();
    });

    //Update the order in which the news items are displayed
    $orderSelect.on("selectmenuchange blur", function () {
        refreshNewsListing();
    });

    $filters.on("selectmenuchange blur", function () {
        $filters.filter().each(function () {
            $(this).val('');
        });
        refreshNewsListing();
    });

    $orderSelect.on("change", function () {
        refreshNewsListing();
    });

    $filters.on("change", function () {
        $filters.filter(':not(#' + this.id + ')').each(function () {
            $(this).val('');
        });
        refreshNewsListing();
    });

    var refreshNewsListing = function (style, append) {
        if (!style)
            style = $displayStyle.find('a.selected').data('display-style');

        var taxonomies = {};

        $filters.each(function () {
            var $this = $(this);
            taxonomies[this.id] = $this.val();
        });

        var data = {
            style: style,
            order: $orderSelect.val(),
            publishedDate: $datePagination.find('li.active').children(':first').data('date'),
            pageNumber: $dataContainer.data('page-number'),
            append: (append === true),
            taxonomies: taxonomies
        };

        if (append)
            data.pageNumber++;

        $.ajax({
            method: 'post',
            url: '/news',
            data: data,
            success: function (data, status, jqXHR) {
                if (append)
                    $dataContainer.append(data.html);
                else
                    $dataContainer.html(data.html);

                if ($dataContainer.children().length === 0)
                    $('.no-results-message').removeClass('hidden');
                else
                    $('.no-results-message').addClass('hidden');

                if (data.eof)
                    $showMoreButton.hide();

                if (append)
                    $dataContainer.data('page-number', $dataContainer.data('page-number') + 1);

                setBackgroundImage();
            }
        });
    };

    return {

    };
})(jQuery);

function showGridView()
{
    $('.display-style-container.Grid').show();
    $('.display-style-container.List').hide();
}

function showListView()
{
    $('.display-style-container.Grid').hide();
    $('.display-style-container.List').show();
}

function initToolClickHandler () {

    var $dataContainer = $('.container div.tool-tile, .container div.new-tool-tile');
    $dataContainer.on('click', function () {
        window.location.href = $(this).data('tool-url');
    });

}(jQuery);