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
                
                {/* or, if modified, allow reverting or overwriting changes */}
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
}

export default PresetContainer;
export { PresetContainer, initPresetContainer };


