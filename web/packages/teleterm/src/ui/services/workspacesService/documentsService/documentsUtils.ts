/**
 * Copyright 2023 Gravitational, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ClusterOrResourceUri, routing } from 'teleterm/ui/uri';
import { assertUnreachable } from 'teleterm/ui/utils';

import { Document } from './types';

export function getResourceUri(document: Document): ClusterOrResourceUri {
  switch (document.kind) {
    case 'doc.cluster':
      return document.clusterUri;
    case 'doc.gateway':
      return document.targetUri;
    case 'doc.terminal_tsh_node':
      return document.serverUri;
    case 'doc.terminal_tsh_kube':
      return document.kubeUri;
    case 'doc.access_requests':
      return document.clusterUri;
    case 'doc.terminal_shell':
      return routing.getClusterUri({
        rootClusterId: document.rootClusterId,
        leafClusterId: document.leafClusterId,
      });
    case 'doc.blank':
      return undefined;
    default:
      assertUnreachable(document);
  }
}
