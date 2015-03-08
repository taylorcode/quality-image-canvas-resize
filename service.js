import {imageCanvasShrinker} from 'image-canvas-shrinker'
import {gamealchemist} from 'gamealchemist'

// register in an angular js module as services 

angular.module('imageCanvasShrinker', [])

.service('gamealchemist', gamealchemist)
.provider('imageCanvasShrinker', imageCanvasShrinker)