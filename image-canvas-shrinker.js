/**
  * @ngdoc provider
  * @name ImageCanvasShrinker
  * @description 
  * Configures an `imageCanvasShrinker` instance with defaults for resizing images.
  *
 */

export function imageCanvasShrinker() {

	var providerInstance = {
		defaultMaxHeight: 100,
		defaultMaxWidth: 100,
		$get: function ($q, gamealchemist) {
			return new ImageCanvasShrinker($q, gamealchemist, providerInstance.defaultMaxHeight, providerInstance.defaultMaxWidth)
		}
	}
}

/**
  * @ngdoc class
  * @name ImageCanvasShrinker
  * @description 
  * Down scales images using `canvas` to decrease upload time.
  *
 */

class ImageCanvasShrinker {

	constructor($q, gamealchemist, defaultMaxHeight, defaultMaxWidth) {
		this.$q = $q
		this.gamealchemist = gamealchemist
		this.maxHeight = defaultMaxHeight
		this.maxWidth = defaultMaxWidth
	}

	/**
	 * @ngdoc method
	 * @name ImageCanvasShrinker#_calculateImageScaleFactor
	 * @private
	 *
	 * @description
	 * Calculates a ratio to scale down an image, based on a width and height constraint.
	 * 
	 * @param {number} width The maximum width that may be used as the ratio constraint
	 * @param {number} height The maximum height that may be used as the ratio constraint
	 * @returns {number} The ratio based on the constraints of the downscaled image to the original
	 */
	_calculateImageScaleFactor(width, height) {
		if(this.width > this.height) {
			if(this.width > this.maxWidth) {
				return (width || this.maxWidth) / this.width
			}
		} else if (this.height > this.maxWidth) {
			return (height || this.maxHeight) / this.height
		}
	}

	/**
	 * @ngdoc method
	 * @name ImageCanvasShrinker#downsize
	 *
	 * @description
	 * Resizes an image if the desired width or height is less than the image width or height.
	 * 
	 * @param {File} file The file from the users computer that may be resized
	 * @param {number} width The desired maximum width for the resized image
	 * @param {number} height The desired maximum height for the resized image
	 * @returns {Object} A promise that when unwrapped will contain the resized image `File`,
	 *   or the original image if no resize was performed.
	 */
	downsize(file, width, height) {

		var defer = this.$q.defer(),
			image = new Image

		image.onload(() => {
			// calculate a ratio to downsize
			let scaleFactor = this._calculateImageScaleFactor.call(image, width, height)

			if(scaleFactor >= 1) {
				// do not downsize the image, is already small enough
				defer.resolve({
					file: file,
					url: URL.createObjectURL(file)
				})
			} else {
				// use gamealchemist algorithm to downsize
				this.gamealchemist.downScaleImage(image, scaleFactor).toBlob((file) => {
					defer.resolve({
						file: file,
						url: URL.createObjectURL(file)
					})
				})
			}

		})
		return defer.promise
	}
}