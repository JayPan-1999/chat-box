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

import React, { ReactElement, useEffect } from "react";
import { BlockAttributes } from "widget-sdk";
import ChatUI from "./components/ChatUI";

/**
 * React Component
 */
export interface DdaiChatBoxProps {
  message: string;
  contentLanguage?: string;
  show_trigger_button?: boolean;
  initial_visible?: boolean;
  title?: string;
  placeholder?: string;
  welcome_message?: string;
}

export const DdaiChatBox = ({
  message,
  contentLanguage,
  show_trigger_button,
  initial_visible = false,
  title = "Chat11",
  placeholder = "Type your message here...",
  welcome_message = "Hello! How can I help you today?",
}: DdaiChatBoxProps): ReactElement => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//g.alicdn.com/chatui/icons/2.6.2/index.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.removeChild(script)
    }
  }, [])


  const handleSendMessage = (msg: string) => {
    console.log("Message sent:", msg);
    // Here you would typically send the message to your API
  };

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name, file.type, file.size);
    // Here you would typically upload the file to your server
  };

  const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    console.log("Feedback received:", messageId, feedback);
    // Here you would typically send the feedback to your API
  };

  return (
    <ChatUI
      initial_visible={initial_visible}
      show_trigger_button={show_trigger_button}
      title={title || message}
      placeholder={placeholder}
      welcome_message={welcome_message}
      onSendMessage={handleSendMessage}
      onFileUpload={handleFileUpload}
      onFeedback={handleFeedback}
    />
  );
};

