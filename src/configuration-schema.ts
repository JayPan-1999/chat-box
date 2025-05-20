/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

/**
 * schema used for generation of the configuration dialog
 * see https://rjsf-team.github.io/react-jsonschema-form/docs/ for documentation
 */
export const configurationSchema: JSONSchema7 = {
  properties: {
    message: {
      type: "string",
      title: "Message",
      description: "This text will be used as fallback for the chat title",
    },
    show_trigger_button: {
      type: "boolean",
      title: "Show Trigger Button",
      description: "Show a button to open/close the chat",
      default: false,
    },
    initial_visible: {
      type: "boolean",
      title: "Initially Visible",
      description: "Show the chat box when the page loads",
      default: false,
    },
    title: {
      type: "string",
      title: "Chat Title",
      description: "Title displayed at the top of the chat box",
    },
    placeholder: {
      type: "string",
      title: "Input Placeholder",
      description: "Placeholder text for the chat input field",
      default: "Type your message here...",
    },
    welcome_message: {
      type: "string",
      title: "Welcome Message",
      description: "Initial message displayed in the chat",
      default: "Hello! How can I help you today?",
    },
  },
};

/**
 * schema to add more customization to the form's look and feel
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
export const uiSchema: UiSchema = {
  message: {
    "ui:help": "Please enter a message to show",
  },
  show_trigger_button: {
    "ui:widget": "checkbox",
  },
  initial_visible: {
    "ui:widget": "checkbox",
  },
  title: {
    "ui:help": "If not provided, the message value will be used as title",
  },
  placeholder: {
    "ui:help": "Text shown in the input field when empty",
  },
  welcome_message: {
    "ui:help": "First message shown in the chat from the system",
  },
};
