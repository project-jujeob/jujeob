/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckfinder/ckfinderui
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The CKFinder UI plugin. It introduces the `'ckfinder'` toolbar button.
 */
export default class CKFinderUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CKFinderUI";
    /**
     * @inheritDoc
     */
    init(): void;
}
