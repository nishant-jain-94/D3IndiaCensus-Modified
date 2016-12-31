# Test Cases for D3 Charts

The Intent is to test some basic attributes of a Bar Chart plotted using D3.js

## Thought Process:

1. Initially I had started writing the test cases to unit test the code. 
But wouldn't be useful as each candidate will have seperate piece of code. 

2. Hence, thought about an other approach through which we can take the *js (the one in which he has written the rendering logic)* 
and the *json* file which the candidate used to plot the D3 chart. Then, inject these files in browser with the specs created by us
and then run the test cases. 

3. To do the above stuffs have used the following:
	1. Karma as the Test Runner
	2. Jasmine for writing Test Cases
	3. PhantomJS as the Headless Browser 

## The following are some basic attributes which will be tested:

1. There should be a SVG element present in the document.
2. The SVG element should have minimum height and wight.
3. The axes(X and Y) should be present and should be exactly 1 in number.
4. Should render Bins, should atleast have one bin plotted, just to make sure that something is plotted
5. The Sum of the width of each bins should be less than the width of the SVG, else the bins will be clipped from the SVG
6. The Height of each bin should be less than the height of the SVG element. 


## Some assumptions made while writing the test case:

1. The candidate creates the bar char with the class *bar* for all the bins.
2. The candidate creates the x and y axis with classes *x axis* and *y axis* respectively.
 	

## To view the chart plotted

1. cd into the D3IndiaCensus-Modified then run the static server

## To run the test cases
	npm install
	npm run karma
