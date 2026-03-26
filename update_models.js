const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'public', 'exercise.html');
let content = fs.readFileSync(targetPath, 'utf8');

const newM002 = `            } else if (id === 'M002') { // Leg Press
                const scene = document.createElement('a-entity');
                scene.innerHTML = \`
                    <a-entity position="0 0.1 0">
                        <a-box position="0 0 0" width="0.8" height="0.1" depth="2.0" color="\${colorMachineFrame}" shadow="cast:true; receive:true"></a-box>
                        <a-entity position="0 0.4 -0.5">
                            <a-box position="0 0.1 -0.2" width="0.5" height="0.8" depth="0.1" color="\${colorMachineAccent}" rotation="45 0 0" shadow="receive:true"></a-box>
                            <a-box position="0 -0.2 0.1" width="0.5" height="0.1" depth="0.5" color="\${colorMachineAccent}" shadow="receive:true"></a-box>
                        </a-entity>
                        <a-box position="-0.4 0.6 0.6" width="0.05" height="0.05" depth="1.5" color="\${colorMachineFrame}" rotation="45 0 0"></a-box>
                        <a-box position="0.4 0.6 0.6" width="0.05" height="0.05" depth="1.5" color="\${colorMachineFrame}" rotation="45 0 0"></a-box>
                        <a-entity position="0 0.8 0.5" animation="property: position; from: 0 0.5 0.2; to: 0 1.0 0.7; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-box position="0 0 0" width="0.7" height="0.5" depth="0.05" color="#222" rotation="45 0 0"></a-box>
                            <a-cylinder position="-0.45 0 0" radius="0.15" height="0.1" color="\${colorMachineWeight}" rotation="0 0 90"></a-cylinder>
                            <a-cylinder position="0.45 0 0" radius="0.15" height="0.1" color="\${colorMachineWeight}" rotation="0 0 90"></a-cylinder>
                        </a-entity>
                    </a-entity>
                    <a-entity id="exerciser" position="0 0.5 -0.4">
                        <a-entity position="0 0.2 0" rotation="45 0 0">
                            <a-box position="0 0.15 -0.1" width="0.45" height="0.55" depth="0.2" color="\${colorShirt}" shadow="cast:true"></a-box>
                            <a-cylinder position="0 0.45 -0.1" radius="0.03" height="0.1" color="\${colorSkin}"></a-cylinder>
                            <a-sphere position="0 0.6 -0.1" radius="0.12" color="\${colorSkin}" rotation="-45 0 0"></a-sphere>
                            <a-entity position="-0.25 0.2 -0.1" rotation="0 0 20">
                                <a-cylinder position="0 -0.15 0" radius="0.04" height="0.35" color="\${colorSkin}"></a-cylinder>
                                <a-cylinder position="0 -0.4 0.15" radius="0.035" height="0.35" color="\${colorSkin}" rotation="-40 0 0"></a-cylinder>
                            </a-entity>
                            <a-entity position="0.25 0.2 -0.1" rotation="0 0 -20">
                                <a-cylinder position="0 -0.15 0" radius="0.04" height="0.35" color="\${colorSkin}"></a-cylinder>
                                <a-cylinder position="0 -0.4 0.15" radius="0.035" height="0.35" color="\${colorSkin}" rotation="-40 0 0"></a-cylinder>
                            </a-entity>
                        </a-entity>
                        <a-entity position="0 0 0">
                            <a-entity position="-0.15 0.1 0.1" animation="property: rotation; from: -70 0 0; to: -10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                <a-cylinder position="0 0.25 0" radius="0.07" height="0.5" color="\${colorPants}"></a-cylinder>
                                <a-entity position="0 0.5 0" animation="property: rotation; from: 130 0 0; to: 10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                    <a-cylinder position="0 0.2 0" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                                    <a-box position="0 0.4 0.05" width="0.12" height="0.06" depth="0.22" color="\${colorShoes}" rotation="45 0 0"></a-box>
                                </a-entity>
                            </a-entity>
                            <a-entity position="0.15 0.1 0.1" animation="property: rotation; from: -70 0 0; to: -10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                <a-cylinder position="0 0.25 0" radius="0.07" height="0.5" color="\${colorPants}"></a-cylinder>
                                <a-entity position="0 0.5 0" animation="property: rotation; from: 130 0 0; to: 10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                    <a-cylinder position="0 0.2 0" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                                    <a-box position="0 0.4 0.05" width="0.12" height="0.06" depth="0.22" color="\${colorShoes}" rotation="45 0 0"></a-box>
                                </a-entity>
                            </a-entity>
                        </a-entity>
                    </a-entity>
                \`;
                wrapper.appendChild(scene);

            } else if (id === 'M003') { // Chest Press
                const scene = document.createElement('a-entity');
                scene.innerHTML = \`
                    <a-entity position="0 0 0">
                        <a-box position="0 0.05 0" width="0.8" height="0.1" depth="1.2" color="\${colorMachineFrame}" shadow="receive:true; cast:true"></a-box>
                        <a-box position="0 0.4 0.2" width="0.4" height="0.08" depth="0.4" color="\${colorMachineAccent}" shadow="receive:true; cast:true"></a-box>
                        <a-box position="0 0.9 -0.1" width="0.35" height="0.8" depth="0.08" color="\${colorMachineAccent}" rotation="10 0 0"></a-box>
                        <a-box position="0 1.0 -0.3" width="0.15" height="1.8" depth="0.15" color="\${colorMachineFrame}"></a-box>
                        <a-box position="0 0.6 -0.3" width="0.3" height="0.8" depth="0.2" color="\${colorMachineWeight}"
                               animation="property: position; from: 0 0.6 -0.3; to: 0 1.2 -0.3; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine"></a-box>
                        <a-entity position="0 1.6 -0.1" animation="property: rotation; from: 20 0 0; to: -15 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-box position="-0.4 -0.4 0.3" width="0.05" height="0.8" depth="0.05" color="#555" rotation="15 0 0"></a-box>
                            <a-box position="0.4 -0.4 0.3" width="0.05" height="0.8" depth="0.05" color="#555" rotation="15 0 0"></a-box>
                            <a-cylinder position="-0.4 -0.7 0.4" radius="0.025" height="0.15" color="#111" rotation="90 0 0"></a-cylinder>
                            <a-cylinder position="0.4 -0.7 0.4" radius="0.025" height="0.15" color="#111" rotation="90 0 0"></a-cylinder>
                        </a-entity>
                    </a-entity>
                    <a-entity position="0 0.45 0.1">
                        <a-sphere position="0 0.85 0" radius="0.12" color="\${colorSkin}" shadow="cast:true"></a-sphere>
                        <a-cylinder position="0 0.73 -0.02" radius="0.03" height="0.1" color="\${colorSkin}"></a-cylinder>
                        <a-box position="0 0.45 -0.05" width="0.45" height="0.55" depth="0.2" color="\${colorShirt}" rotation="10 0 0" shadow="cast:true"></a-box>
                        <a-entity position="-0.15 0.15 0.15">
                            <a-cylinder position="0 0 0.15" radius="0.07" height="0.35" color="\${colorPants}" rotation="90 0 0"></a-cylinder>
                            <a-cylinder position="0 -0.2 0.3" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                            <a-box position="0 -0.4 0.35" width="0.12" height="0.06" depth="0.22" color="\${colorShoes}"></a-box>
                        </a-entity>
                        <a-entity position="0.15 0.15 0.15">
                            <a-cylinder position="0 0 0.15" radius="0.07" height="0.35" color="\${colorPants}" rotation="90 0 0"></a-cylinder>
                            <a-cylinder position="0 -0.2 0.3" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                            <a-box position="0 -0.4 0.35" width="0.12" height="0.06" depth="0.22" color="\${colorShoes}"></a-box>
                        </a-entity>
                        <a-entity position="-0.25 0.65 0" animation="property: rotation; from: 50 20 0; to: -15 20 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-cylinder position="0 -0.15 0" radius="0.04" height="0.3" color="\${colorSkin}"></a-cylinder>
                            <a-entity position="0 -0.3 0" animation="property: rotation; from: -100 0 0; to: -10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                <a-cylinder position="0 -0.15 0" radius="0.035" height="0.3" color="\${colorSkin}"></a-cylinder>
                                <a-box position="0 -0.32 0" width="0.08" height="0.05" depth="0.08" color="\${colorSkin}"></a-box>
                            </a-entity>
                        </a-entity>
                        <a-entity position="0.25 0.65 0" animation="property: rotation; from: 50 -20 0; to: -15 -20 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-cylinder position="0 -0.15 0" radius="0.04" height="0.3" color="\${colorSkin}"></a-cylinder>
                            <a-entity position="0 -0.3 0" animation="property: rotation; from: -100 0 0; to: -10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                <a-cylinder position="0 -0.15 0" radius="0.035" height="0.3" color="\${colorSkin}"></a-cylinder>
                                <a-box position="0 -0.32 0" width="0.08" height="0.05" depth="0.08" color="\${colorSkin}"></a-box>
                            </a-entity>
                        </a-entity>
                    </a-entity>
                \`;
                wrapper.appendChild(scene);

            } else if (id === 'M004') { // Lat Pulldown
                const scene = document.createElement('a-entity');
                scene.innerHTML = \`
                    <a-entity position="0 0 0">
                        <a-box position="0 0.05 0" width="0.8" height="0.1" depth="1.2" color="\${colorMachineFrame}" shadow="receive:true; cast:true"></a-box>
                        <a-box position="0 0.5 0.2" width="0.4" height="0.08" depth="0.4" color="\${colorMachineAccent}"></a-box>
                        <a-cylinder position="0 0.75 0.35" radius="0.06" height="0.5" color="\${colorMachineAccent}" rotation="0 0 90"></a-cylinder>
                        <a-box position="0 1.2 -0.4" width="0.15" height="2.4" depth="0.15" color="\${colorMachineFrame}"></a-box>
                        <a-box position="0 2.4 0" width="0.1" height="0.1" depth="0.8" color="\${colorMachineFrame}"></a-box>
                        <a-entity position="0 2.1 0.4" animation="property: position; from: 0 2.1 0.4; to: 0 1.4 0.4; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-cylinder position="0 0.15 0" radius="0.01" height="0.3" color="#aaa"></a-cylinder>
                            <a-cylinder position="0 0 0" radius="0.02" height="1.2" color="#eee" rotation="0 0 90"></a-cylinder>
                            <a-cylinder position="-0.5 0 0" radius="0.025" height="0.2" color="#111" rotation="0 0 90"></a-cylinder>
                            <a-cylinder position="0.5 0 0" radius="0.025" height="0.2" color="#111" rotation="0 0 90"></a-cylinder>
                        </a-entity>
                        <a-box position="0 0.8 -0.4" width="0.3" height="0.6" depth="0.2" color="\${colorMachineWeight}"
                               animation="property: position; from: 0 0.6 -0.4; to: 0 1.3 -0.4; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine"></a-box>
                    </a-entity>
                    <a-entity position="0 0.55 0.1">
                        <a-sphere position="0 0.8 0" radius="0.12" color="\${colorSkin}" shadow="cast:true" animation="property: rotation; from: -10 0 0; to: 10 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true"></a-sphere>
                        <a-cylinder position="0 0.68 -0.02" radius="0.03" height="0.1" color="\${colorSkin}"></a-cylinder>
                        <a-box position="0 0.38 -0.05" width="0.45" height="0.55" depth="0.2" color="\${colorShirt}" shadow="cast:true" animation="property: rotation; from: -5 0 0; to: -15 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine"></a-box>
                        <a-entity position="-0.12 0.05 0.1">
                            <a-cylinder position="0 0 0.15" radius="0.07" height="0.35" color="\${colorPants}" rotation="90 0 0"></a-cylinder>
                            <a-cylinder position="0 -0.2 0.3" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                            <a-box position="0 -0.45 0.35" width="0.12" height="0.06" depth="0.22" color="\${colorShoes}"></a-box>
                        </a-entity>
                        <a-entity position="0.12 0.05 0.1">
                            <a-cylinder position="0 0 0.15" radius="0.07" height="0.35" color="\${colorPants}" rotation="90 0 0"></a-cylinder>
                            <a-cylinder position="0 -0.2 0.3" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                            <a-box position="0 -0.45 0.35" width="0.12" height="0.06" depth="0.22" color="\${colorShoes}"></a-box>
                        </a-entity>
                        <a-entity position="-0.25 0.6 0" rotation="0 0 30" animation="property: rotation; from: -150 -20 20; to: -40 -30 40; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-cylinder position="0 -0.2 0" radius="0.04" height="0.4" color="\${colorSkin}"></a-cylinder>
                            <a-entity position="0 -0.4 0" animation="property: rotation; from: 0 0 0; to: -100 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                <a-cylinder position="0 -0.2 0" radius="0.035" height="0.4" color="\${colorSkin}"></a-cylinder>
                                <a-box position="0 -0.42 0" width="0.08" height="0.05" depth="0.08" color="\${colorSkin}"></a-box>
                            </a-entity>
                        </a-entity>
                        <a-entity position="0.25 0.6 0" rotation="0 0 -30" animation="property: rotation; from: -150 20 -20; to: -40 30 -40; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                            <a-cylinder position="0 -0.2 0" radius="0.04" height="0.4" color="\${colorSkin}"></a-cylinder>
                            <a-entity position="0 -0.4 0" animation="property: rotation; from: 0 0 0; to: -100 0 0; dur: \${SCENE_DUR}; dir: alternate; loop: true; easing: easeInOutSine">
                                <a-cylinder position="0 -0.2 0" radius="0.035" height="0.4" color="\${colorSkin}"></a-cylinder>
                                <a-box position="0 -0.42 0" width="0.08" height="0.05" depth="0.08" color="\${colorSkin}"></a-box>
                            </a-entity>
                        </a-entity>
                    </a-entity>
                \`;
                wrapper.appendChild(scene);

            } else if (id === 'M005') { // Stationary Bike
                const scene = document.createElement('a-entity');
                scene.innerHTML = \`
                    <a-entity id="bike" position="0 0.1 0">
                        <a-box position="0 0 0" width="0.4" height="0.1" depth="1.2" color="\${colorMachineFrame}" shadow="receive:true; cast:true"></a-box>
                        <a-cylinder position="0 0.5 0.3" radius="0.05" height="1.0" color="\${colorMachineFrame}" rotation="-20 0 0"></a-cylinder>
                        <a-cylinder position="0 0.5 -0.3" radius="0.05" height="1.0" color="\${colorMachineFrame}" rotation="20 0 0"></a-cylinder>
                        <a-box position="0 0.95 0.45" width="0.5" height="0.05" depth="0.15" color="\${colorMachineAccent}"></a-box>
                        <a-box position="0 0.95 -0.4" width="0.3" height="0.1" depth="0.3" color="\${colorMachineAccent}"></a-box>
                        <a-cylinder position="0 0.4 0.4" radius="0.3" height="0.1" color="#888" rotation="0 0 90"></a-cylinder>
                        <a-entity position="0 0.3 0" animation="property: rotation; from: 0 0 0; to: -360 0 0; dur: \${SCENE_DUR}; loop: true; easing: linear">
                            <a-box position="-0.15 0.15 0" width="0.02" height="0.3" depth="0.04" color="#333" rotation="0 0 0"></a-box>
                            <a-box position="0.15 -0.15 0" width="0.02" height="0.3" depth="0.04" color="#333" rotation="0 0 0"></a-box>
                            <a-entity position="-0.2 0.3 0" animation="property: rotation; from: 0 0 0; to: 360 0 0; dur: \${SCENE_DUR}; loop: true; easing: linear">
                                <a-box width="0.1" height="0.02" depth="0.12" color="#111"></a-box>
                            </a-entity>
                            <a-entity position="0.2 -0.3 0" animation="property: rotation; from: 0 0 0; to: 360 0 0; dur: \${SCENE_DUR}; loop: true; easing: linear">
                                <a-box width="0.1" height="0.02" depth="0.12" color="#111"></a-box>
                            </a-entity>
                        </a-entity>
                    </a-entity>
                    <a-entity position="0 1.05 -0.35">
                        <a-sphere position="0 0.6 0.35" radius="0.12" color="\${colorSkin}" shadow="cast:true" rotation="-20 0 0"></a-sphere>
                        <a-cylinder position="0 0.48 0.35" radius="0.03" height="0.1" color="\${colorSkin}"></a-cylinder>
                        <a-box position="0 0.3 0.15" width="0.4" height="0.5" depth="0.2" color="\${colorShirt}" rotation="40 0 0" shadow="cast:true"></a-box>
                        <a-entity position="-0.2 0.4 0.2" rotation="70 20 0">
                            <a-cylinder position="0 0.15 0" radius="0.035" height="0.3" color="\${colorSkin}"></a-cylinder>
                            <a-entity position="0 0.3 0" rotation="20 0 0">
                                <a-cylinder position="0 0.15 0" radius="0.03" height="0.3" color="\${colorSkin}"></a-cylinder>
                                <a-box position="0 0.3 0" width="0.06" height="0.06" depth="0.06" color="\${colorSkin}"></a-box>
                            </a-entity>
                        </a-entity>
                        <a-entity position="0.2 0.4 0.2" rotation="70 -20 0">
                            <a-cylinder position="0 0.15 0" radius="0.035" height="0.3" color="\${colorSkin}"></a-cylinder>
                            <a-entity position="0 0.3 0" rotation="20 0 0">
                                <a-cylinder position="0 0.15 0" radius="0.03" height="0.3" color="\${colorSkin}"></a-cylinder>
                                <a-box position="0 0.3 0" width="0.06" height="0.06" depth="0.06" color="\${colorSkin}"></a-box>
                            </a-entity>
                        </a-entity>
                        <a-entity position="0 0.05 0.05">
                            <a-entity position="-0.15 0 0" animation="property: rotation; from: -10 0 0; to: -70 0 0; dur: \${SCENE_DUR/2}; dir: alternate; loop: true; easing: easeInOutSine">
                                 <a-cylinder position="0 -0.2 0" radius="0.07" height="0.4" color="\${colorPants}"></a-cylinder>
                                 <a-entity position="0 -0.4 0" animation="property: rotation; from: 70 0 0; to: 10 0 0; dur: \${SCENE_DUR/2}; dir: alternate; loop: true; easing: easeInOutSine">
                                    <a-cylinder position="0 -0.2 0" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                                    <a-box position="0 -0.45 0.05" width="0.1" height="0.05" depth="0.2" color="\${colorShoes}"></a-box>
                                 </a-entity>
                            </a-entity>
                            <a-entity position="0.15 0 0" animation="property: rotation; from: -70 0 0; to: -10 0 0; dur: \${SCENE_DUR/2}; dir: alternate; loop: true; easing: easeInOutSine">
                                 <a-cylinder position="0 -0.2 0" radius="0.07" height="0.4" color="\${colorPants}"></a-cylinder>
                                 <a-entity position="0 -0.4 0" animation="property: rotation; from: 10 0 0; to: 70 0 0; dur: \${SCENE_DUR/2}; dir: alternate; loop: true; easing: easeInOutSine">
                                    <a-cylinder position="0 -0.2 0" radius="0.06" height="0.4" color="\${colorPants}"></a-cylinder>
                                    <a-box position="0 -0.45 0.05" width="0.1" height="0.05" depth="0.2" color="\${colorShoes}"></a-box>
                                 </a-entity>
                            </a-entity>
                        </a-entity>
                    </a-entity>
                \`;
                wrapper.appendChild(scene);
            } else {`;

const regex = /\} else if \(id === 'M002'\) \{[\s\S]*?\} else \{/;
content = content.replace(regex, newM002);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully updated 3D AR Models.');
