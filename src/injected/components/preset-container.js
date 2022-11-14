import dom, { Fragment } from "jsx-render";
import JSXComponent from 'jsx-render/lib/JSXComponent'
import classnames from 'classnames';

// custom components
import { Tooltip } from "../../components/tooltip"

import { OPTIONS } from "../user-options";

import { plugin } from "../../metadata";
import { devWarning } from "../generic-helpers";

import { useBoardSettings, getListSettingsArray } from "../data";

import DeletePresetButton, { initDeletePresetButtons } from "./delete-preset-button";
import RevertPresetButton, { initRevertPresetButtons } from "./revert-preset-button";
import SavePresetButton, { initSavePresetButtons } from "./save-preset-button";
import PresetButton, { initPresetButtons } from "./preset-button";



class PresetContainer extends JSXComponent {


  render(props) {
    
    const {
        boardPreset,
        index
    } = props;

    const [boardSettings] = useBoardSettings();

    return (
        <div
            className = {classnames(
                plugin.slug + "_preset-container",
                index === 0 && plugin.slug + "_default" || !boardPreset.isSaved && plugin.slug + "_unsaved",
                index == boardSettings.activeBoardPreset && plugin.slug + "_active",
            )}
        >

            {index != 0 && ( <Fragment>

                {/* Allow deletion of preset */}
                <DeletePresetButton index={index}/>
                {/* Hide these unless the preset is modified */}
                <RevertPresetButton index={index}/>
                <SavePresetButton index={index}/>

            </Fragment> )}

            <PresetButton
                index = {index}
                boardPreset = {boardPreset}
            />

        </div>
    );


  }

}

const initPresetContainer = () => {
    initPresetButtons();
    initDeletePresetButtons();
    initRevertPresetButtons();
    initSavePresetButtons();

    let $containers = $(`.${plugin.slug}_preset-container`);
  

    // RIGHT CLICK ACTIONS
    $containers.on("contextmenu", (e) => {
        const $clickedContainer = $(e.currentTarget)
        const menuIsClosed = !$clickedContainer.hasClass( plugin.slug + "_open" );

        $containers.removeClass( plugin.slug + "_open" );   // close all containers
        if(menuIsClosed) {
            $clickedContainer.addClass( plugin.slug + "_open" );    // reopen the one that's supposed to be open
        }
        
        // Stop the standard context menu appearing
        return false;
    });
}





export default PresetContainer;
export { PresetContainer, initPresetContainer };


