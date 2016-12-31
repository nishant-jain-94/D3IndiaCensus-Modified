/**
 * The Intent is to test some basic attributes of a Bar Chart plotted using D3.js
 *
 * Thought Process:
 * 1. Initially I had started writing the test cases to unit test the code. 
 * But wouldn't be useful as each candidate will have seperate piece of code. 
 * 
 *
 * 2. Hence, thought about an other approach through which we can take the *js (the one in which he has written the rendering logic)* 
 * and the *json* file which the candidate used to plot the D3 chart. Then, inject these files in browser with the specs created by us
 * and then run the test cases. 
 *
 * 3. To do the above stuffs have used the following:
 * 		1. Karma as the Test Runner
 * 		2. Jasmine for writing Test Cases
 * 		3. PhantomJS as the Headless Browser 
 * 
 * The following are some basic attributes which will be tested:
 * 1. There should be a SVG element present in the document.
 * 2. The SVG element should have minimum height and wight.
 * 3. The axes(X and Y) should be present and should be exactly 1 in number.
 * 4. Should render Bins, should atleast have one bin plotted, just to make sure that something is plotted
 * 5. The Sum of the width of each bins should be less than the width of the SVG, else the bins will be clipped from the SVG
 * 6. The Height of each bin should be less than the height of the SVG element. 
 *
 * Some assumptions made while writing the test case:
 * 	1. The candidate creates the bar char with the class *bar* for all the bins.
 * 	2. The candidate creates the x and y axis with classes *x axis* and *y axis* respectively.
 */
describe('Testing D3.js with Jasmine', function() {
	
	beforeAll(function(done) {
		window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		setTimeout(function() {
			done();
		}, 1000);
	});

	describe('The SVG', function() {
		it('Should be created', function() {
			expect(d3.select('svg')).not.toBe(null);
		});

		it('Should have the minimum width', function() {
			expect(d3.select('svg').attr('width')).not.toBeLessThan('1200');
		});

		it('Should have the minimum height', function() {
			expect(d3.select('svg').attr('height')).not.toBeLessThan('650');
		});
	});

	describe('Test Axis creation', function() {
		it('should create a xAxis', function() {
			expect(d3.selectAll('g.x.axis')[0].length).toBe(1);
		});

		it('should create a yAxis', function() {
			expect(d3.selectAll('g.y.axis')[0].length).toBe(1);
		});
	});

	describe('Create Bars', function() {
		it('should render bars', function() {
			expect(d3.selectAll('rect.bar')[0].length).not.toBeLessThan(0);
		});

		it('Sum of the width of all the bins should be less than the width of SVG', function() {
			var width = 0;
			d3.selectAll('rect.bar')[0].forEach(function(elem) {
				width += +d3.select(elem).attr('width');
			})
			expect(width).toBeLessThan(d3.select('svg').attr('width'));
		});

		it('Height of each bin should be less than the height of SVG', function() {
			d3.selectAll('rect.bar')[0].forEach(function (elem) {
				var height = +d3.select(elem).attr('height');
				expect(height).toBeLessThan(d3.select('svg').attr('height'));
			})
		});

		it('Number of ticks on the xAxis should equal to the number of bins rendered', function() {
			var numberOfBins = d3.selectAll('rect.bar')[0].length;
			var numberOfTicks = d3.select('svg g.x.axis').selectAll('g.tick')[0].length; 
			expect(numberOfTicks).toEqual(numberOfBins);
		});
	});


});