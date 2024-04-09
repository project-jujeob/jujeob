/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from '@ckeditor/ckeditor5-core';
import { Range, type Element, type DocumentFragment, type DocumentSelection, type Selection, type Writer } from '@ckeditor/ckeditor5-engine';
/**
 * Part of the clipboard logic. Responsible for collecting markers from selected fragments
 * and restoring them with proper positions in pasted elements.
 *
 * @internal
 */
export default class ClipboardMarkersUtils extends Plugin {
    /**
     * Map of marker names that can be copied.
     *
     * @internal
     */
    private _markersToCopy;
    /**
     * @inheritDoc
     */
    static get pluginName(): "ClipboardMarkersUtils";
    /**
     * Registers marker name as copyable in clipboard pipeline.
     *
     * @param markerName Name of marker that can be copied.
     * @param restrictions Preset or specified array of actions that can be performed on specified marker name.
     * @internal
     */
    _registerMarkerToCopy(markerName: string, restrictions: ClipboardMarkerRestrictionsPreset | Array<ClipboardMarkerRestrictedAction>): void;
    /**
     * Maps preset into array of clipboard operations to be allowed on marker.
     *
     * @param preset Restrictions preset to be mapped to actions
     * @internal
     */
    private _mapRestrictionPresetToActions;
    /**
     * Performs copy markers on provided selection and paste it to fragment returned from `getCopiedFragment`.
     *
     * 	1. Picks all markers in provided selection.
     * 	2. Inserts fake markers to document.
     * 	3. Gets copied selection fragment from document.
     * 	4. Removes fake elements from fragment and document.
     * 	5. Inserts markers in the place of removed fake markers.
     *
     * Due to selection modification, when inserting items, `getCopiedFragment` must *always* operate on `writer.model.document.selection'.
     * Do not use any other custom selection object within callback, as this will lead to out-of-bounds exceptions in rare scenarios.
     *
     * @param action Type of clipboard action.
     * @param writer An instance of the model writer.
     * @param selection Selection to be checked.
     * @param getCopiedFragment	Callback that performs copy of selection and returns it as fragment.
     * @internal
     */
    _copySelectedFragmentWithMarkers(action: ClipboardMarkerRestrictedAction, selection: Selection | DocumentSelection, getCopiedFragment?: (writer: Writer) => DocumentFragment): DocumentFragment;
    /**
     * Performs paste of markers on already pasted element.
     *
     * 	1. Inserts fake markers that are present in fragment element (such fragment will be processed in `getPastedDocumentElement`).
     * 	2. Calls `getPastedDocumentElement` and gets element that is inserted into root model.
     * 	3. Removes all fake markers present in transformed element.
     * 	4. Inserts new markers with removed fake markers ranges into pasted fragment.
     *
     * There are multiple edge cases that have to be considered before calling this function:
     *
     * 	* `markers` are inserted into the same element that must be later transformed inside `getPastedDocumentElement`.
     * 	* Fake marker elements inside `getPastedDocumentElement` can be cloned, but their ranges cannot overlap.
     *
     * @param action Type of clipboard action.
     * @param markers Object that maps marker name to corresponding range.
     * @param getPastedDocumentElement Getter used to get target markers element.
     * @internal
     */
    _pasteMarkersIntoTransformedElement(markers: Record<string, Range> | Map<string, Range>, getPastedDocumentElement: (writer: Writer) => Element): Element;
    /**
     * In some situations we have to perform copy on selected fragment with certain markers. This function allows to temporarily bypass
     * restrictions on markers that we want to copy.
     *
     * This function executes `executor()` callback. For the duration of the callback, if the clipboard pipeline is used to copy
     * content, markers with the specified name will be copied to the clipboard as well.
     *
     * @param markerName Which markers should be copied.
     * @param executor Callback executed.
     * @internal
     */
    _forceMarkersCopy(markerName: string, executor: VoidFunction): void;
    /**
     * Checks if marker can be copied.
     *
     * @param markerName Name of checked marker.
     * @param action Type of clipboard action. If null then checks only if marker is registered as copyable.
     * @internal
     */
    _canPerformMarkerClipboardAction(markerName: string, action: ClipboardMarkerRestrictedAction | null): boolean;
    /**
     * Changes marker names for markers stored in given document fragment so that they are unique.
     *
     * @param fragment
     * @internal
     */
    _setUniqueMarkerNamesInFragment(fragment: DocumentFragment): void;
    /**
     * First step of copying markers. It looks for markers intersecting with given selection and inserts `$marker` elements
     * at positions where document markers start or end. This way `$marker` elements can be easily copied together with
     * the rest of the content of the selection.
     *
     * @param writer An instance of the model writer.
     * @param selection Selection to be checked.
     * @param action Type of clipboard action.
     */
    private _insertFakeMarkersIntoSelection;
    /**
     * Returns array of markers that can be copied in specified selection.
     *
     * @param writer An instance of the model writer.
     * @param selection  Selection which will be checked.
     * @param action Type of clipboard action. If null then checks only if marker is registered as copyable.
     */
    private _getCopyableMarkersFromSelection;
    /**
     * Picks all markers from markers map that can be copied.
     *
     * @param markers Object that maps marker name to corresponding range.
     * @param action Type of clipboard action. If null then checks only if marker is registered as copyable.
     */
    private _getCopyableMarkersFromRangeMap;
    /**
     * Inserts specified array of fake markers elements to document and assigns them `type` and `name` attributes.
     * Fake markers elements are used to calculate position of markers on pasted fragment that were transformed during
     * steps between copy and paste.
     *
     * @param writer An instance of the model writer.
     * @param markers Array of markers that will be inserted.
     */
    private _insertFakeMarkersElements;
    /**
     * Removes all `$marker` elements from the given document fragment.
     *
     * Returns an object where keys are marker names, and values are ranges corresponding to positions
     * where `$marker` elements were inserted.
     *
     * If the document fragment had only one `$marker` element for given marker (start or end) the other boundary is set automatically
     * (to the end or start of the document fragment, respectively).
     *
     * @param writer An instance of the model writer.
     * @param rootElement The element to be checked.
     */
    private _removeFakeMarkersInsideElement;
    /**
     * Returns array that contains list of fake markers with corresponding `$marker` elements.
     *
     * For each marker, there can be two `$marker` elements or only one (if the document fragment contained
     * only the beginning or only the end of a marker).
     *
     * @param writer An instance of the model writer.
     * @param rootElement The element to be checked.
     */
    private _getAllFakeMarkersFromElement;
    /**
     * When copy of markers occurs we have to make sure that pasted markers have different names
     * than source markers. This functions helps with assigning unique part to marker name to
     * prevent duplicated markers error.
     *
     * @param name Name of marker
     */
    private _getUniqueMarkerName;
}
/**
 * Specifies which action is performed during clipboard event.
 *
 * @internal
 */
export type ClipboardMarkerRestrictedAction = 'copy' | 'cut' | 'dragstart';
/**
 * Specifies copy, paste or move marker restrictions in clipboard. Depending on specified mode
 * it will disallow copy, cut or paste of marker in clipboard.
 *
 * 	* `'default'` - the markers will be preserved on cut-paste and drag and drop actions only.
 * 	* `'always'` - the markers will be preserved on all clipboard actions (cut, copy, drag and drop).
 * 	* `'never'` - the markers will be ignored by clipboard.
 *
 * @internal
 */
export type ClipboardMarkerRestrictionsPreset = 'default' | 'always' | 'never';
