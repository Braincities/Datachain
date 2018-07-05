/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Default namespace
const defaultNS = 'org.braincities.datachain.alpha.';

//TODO Add alot more implementations for the various transactions defined in the model

/**
 * Assign a given data set to a broker
 * @param {org.braincities.datachain.alpha.AssignDataSetToBrokerTransaction} tx
 * @transaction
 */
async function assignDataSetToBroker(tx) {

    // Get the data set
    const dataSet = tx.dataSet;
    const broker  = tx.broker;

    //TODO Various data integrety checks ?

    //TODO Check the data set data status is 'READY_FOR_REVIEW'
    //TODO Check the data owner is not blocked

    //TODO Should we do a check on the given broker ?
    //TODO Should we do a cross-check on whether the asset is already assigned ? ( status or broker ID )


    // Assign the broker
    dataSet.broker = broker;

    // Set the data status
    dataSet.dataStatus = dataSetDataStatus.PENDING_REVIEW;

    // Get the asset registry for the data set
    const dataSetRegistry = await getAssetRegistry( defaultNS + 'DataSetAsset');

    // Update the data set in the registry
    await dataSetRegistry.update(dataSet);

    // Does the broker currently has already pending data sets ?
    if (broker.pendingDataSetAssets) {

        // Add our new data set 
        broker.pendingDataSetAssets.push(dataSet);

    } else {

        // Set the pending assets
        broker.pendingDataSetAssets = [dataSet];
    }

    // Get the asset registry for the data set
    const brokerRegistry = await getParticipantRegistry( defaultNS + 'DataBrokerParticipant');

    // Update the broker in the registry
    await brokerRegistry.update(broker);

    // Emit an event for the assignment.
    let event = getFactory().newEvent(defaultNS, 'DataSetAssetBrokerAssignedEvent');

    event.broker = broker;
    event.dataSet = dataSet;

    emit(event);
}
