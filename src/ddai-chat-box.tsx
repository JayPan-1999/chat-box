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

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ChatUI from "./components/ChatUI";

/**
 * React Component
 */
export interface DdaiChatBoxProps {
  message: string;
  showTriggerButton?: boolean;
  initialVisible?: boolean;
  title?: string;
  placeholder?: string;
  welcomeMessage?: string;
}

export const DdaiChatBox = ({
  message,
  contentLanguage,
  showTriggerButton = true,
  initialVisible = false,
  title = "Chat",
  placeholder = "Type your message here...",
  welcomeMessage = "Hello! How can I help you today?",
}: DdaiChatBoxProps): ReactElement => {
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
      initialVisible={initialVisible}
      showTriggerButton={showTriggerButton}
      title={title || message}
      placeholder={placeholder}
      welcomeMessage={welcomeMessage}
      onSendMessage={handleSendMessage}
      onFileUpload={handleFileUpload}
      onFeedback={handleFeedback}
    />
  );
};

