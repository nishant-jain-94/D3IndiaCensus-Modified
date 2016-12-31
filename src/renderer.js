function barChart() {
	
	var that = {};
	that.data = null;
	that.xAttr = null;
	that.yAttr = null;

	var margin = {top: 140, right: 60, bottom: 100, left: 80},
           width = 1200 - margin.left - margin.right,
           height = 650 - margin.top - margin.bottom,
           svg;

    that.createSVGElement = function() {
    	svg = d3.select('body').append('svg')
			.attr('width', width +  margin.left + margin.right)
		   	.attr('height', height + margin.top + margin.bottom)
		  	.append('g')
		  	.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

	  	return svg;
    }

    /**
     * Renders the bar graph.
     * @param {Object} data Data to be plotted
     * @param {String} xAttr Field to be plotted along xAxis
     * @param {String} yAttr Field to be plotted along yAxis
     */
	that.renderer = function(data, xAttr, yAttr) {

		if((xAttr !== undefined && xAttr !== null) && (yAttr !== undefined && yAttr !== null)) {
			console.log('Setting xAttr and yAttr');
			that.setXYAttr(xAttr, yAttr);
		}

		if(data !== undefined && data !== null) {
			console.log('data')
			that.setData(data);
		}

		var data = that.getData();
		// Setting the domain.
		that.setDomain(data);
		
		// Create a svg element with some height and width
		svg = d3.select('body').append('svg')
			.attr('width', width +  margin.left + margin.right)
		   	.attr('height', height + margin.top + margin.bottom)
		  	.append('g')
		  	.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

	  	// Add bars to the svg element
	  	var bars = svg.selectAll('.bar').data(that.getData());

	  	//Get Attributes to be plotted along X and Y axes
	  	var attributes = that.getXYAttr();

	  	bars
	  		.enter().append('rect')
	  		.attr('class', 'bar')
	  		.attr('x', function(d) {
	  			return that.xScale(d[attributes.xAttr])
	  		})
	  		// rangeBand specifies the width of each band in the bar graph
	  		.attr('width', that.xScale.rangeBand())
	  		.attr('y', function(d) {
	  			// console.log(d[attributes.yAttr]);
	  			return that.yScale(d[attributes.yAttr])
	  		})
	  		.attr('height', function(d) {
	  			return height - that.yScale(d[attributes.yAttr])
	  		});

  		that.addAxis();

	}

	/**
	 * Returns the data
	 * @return {Array|Object}
	 */
	that.getData = function() {
		return that.data;
	}

	/**
	 * Sets the data for which the bar graph is to be plotted
	 * @param  {Array|Object} d [description]
	 * 
	 */
	that.setData = function(d) {
		that.data = d;
	}

	/**
	 * Sets the x and y attribute
	 * @param  {String} xAttr Describes what is to be plotted along xAxis
	 * @param  {String} yAttr Describes what is to be plotted along yAxis
	 * 
	 */
	that.setXYAttr = function(xAttr, yAttr) {
		that.xAttr = xAttr;
		that.yAttr = yAttr;
	};

	/**
	 * Gets the X and Y attribute
	 * @return {Object}
	 */
	that.getXYAttr = function() {
		return {
			xAttr: that.xAttr,
			yAttr: that.yAttr
		};
	}

	/**
	 * Gets data from the JSON file and sets it to the data property 
	 * @param  {String}   path Path to the data(the data to be plotted) file 
	 * @param  {Function} cb   Callback when the Json is fetched
	 * 
	 */
	that.getDataFromJsonFile = function(path, cb) {
		d3.json(path, function(error, data) {
			if(!error) {
				that.data = data;
			}
			cb(error, data);
		});
	}

	that.xScale = d3.scale.ordinal()
           .rangeRoundBands([0, width], .1);

    that.yScale = d3.scale.linear()
           .range([height, 0]);

    that.setDomain = function(data) {
    	 var attributes = that.getXYAttr();
         that.xScale.domain(data.map(function(d) { return d[attributes.xAttr]; }));
         that.yScale.domain([0, d3.max(data, function(d) { return d[attributes.yAttr]; })]);
    };

    that.addAxis = function() {

    	var xAxis = d3.svg.axis()
           .scale(that.xScale)
           .orient("bottom");

       var yAxis = d3.svg.axis()
           .scale(that.yScale)
           .orient("left");
           // .tickFormat(formatPercent);

    	svg.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis)
             .selectAll("text")
                       .style("text-anchor", "end")
                       .attr("dx", "-.8em")
                       .attr("dy", ".15em")
                       .attr("transform", function(d) {
                           return "rotate(-65)"
                           });

         svg.append("g")
             .attr("class", "y axis")
             .call(yAxis)
           .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text("Literate population");
    }

	return that;
}


var c = barChart();
c.setXYAttr('group', 'total');
c.getDataFromJsonFile('Feed/age.json', function(error, data) {	
	c.renderer();
});
// console.log('Done with execution');