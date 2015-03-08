# qualityImageCanvasResize

An utility for performing high quality image resizing using canvas and a custom image resize algorithm. It is integrated with angular js, although you can use the services without angular as long so you pass the right dependencies when creating the service instances.

### Basic Setup

First, add this module to your application:

	angular.module('myApp', ['imageCanvasShrinker'])


By default, `imageCanvasShrinker` is configured to constrain images to a maximum width and height of 100px. This is configurable using the service's provider:

	imageCanvasShrinkerProvider.defaultMaxHeight = 500
	imageCanvasShrinkerProvider.defaultMaxWidth = 1000

### Methods

#### imageCanvasShrinker.downsize(file, width, height)

	imageCanvasShrinker.downsize(file).then((resizedFile) => {
		$upload({
			url: '/upload'
			file: resizedFile
		})
	})

In this example, no width or height are specified for the resize, so the defaults configured on the provider are used.

Internally, `imageCanvasShrinker` uses the `gamealchemist` service to perform the downsize. You can also use this service:

#### gamealchemist.downScaleImage(img, scale, callback)

	gamealchemist.downScaleImage(img, .5, (img) => {
		console.log(img) // resized image
	})

Downscale image calls upon `downScaleCanvas` interally, but it can also be used independent for resizing a canvas:

#### gamealchemist.downScaleCanvas(canvas, scale)

	let resizedCanvas = gamealchemist.downScaleCanvas(canvas, .5)
