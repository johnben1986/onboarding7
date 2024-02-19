import Image from 'next/image'
import React, { useState } from 'react'
import purchansing4 from '/public/assets/images/purchasing4.png'
import purchansing2 from '/public/assets/images/purchasing2.png'
import purchansing3 from '/public/assets/images/purchasing3.png'
import { reactIcons } from 'components/utils/icons'
import { Collapse } from '@mui/material'
import MetadataHelper from 'components/MetadataHelper'


const QuickBuild = () => {
    const images = [purchansing4, purchansing2, purchansing3];
    const [questions, setQuestions] = useState([
        {
            id: 1, question: 'What is a web3 site?', isOpen: false, answer: <div>
                <p>As you venture deeper into the realm of Web3 through Web3onboarding.com, you'll encounter the term "Web3 site" with increasing frequency. Let's shed light on this concept, a cornerstone of the decentralized digital landscape.</p>
                <p><strong>Web3 Site: Beyond Traditional Websites</strong></p>
                <p>At its essence, a Web3 site operates in the broader sphere of the decentralized web, known as Web3. Unlike traditional websites that rely on centralized servers, databases, and authorities, Web3 sites function on a decentralized network, primarily supported by blockchain technology.</p>
                <p><strong>Key Aspects of Web3 Sites:</strong></p>
                <ul className='my-2 list-decimal'>
                    <li><strong>Decentralized Hosting: </strong>Instead of being hosted on a single server controlled by a centralized entity, Web3 sites use decentralized file storage systems, like IPFS (InterPlanetary File System) or Arweave. This ensures the website's data is distributed across multiple nodes, enhancing resilience and uptime.</li>
                    <li><strong>User Sovereignty & Interaction: </strong>Web3 sites enable a higher level of user interaction and control. With the integration of blockchain, users can have unique digital identities, allowing for more personalized experiences, direct peer-to-peer interactions, and even transactions without intermediaries.</li>
                    <li><strong>Censorship Resistance: </strong>Due to their decentralized nature, Web3 sites are less susceptible to censorship, control, or shutdown by centralized authorities. This promotes a free and open internet.</li>
                    <li><strong>Enhanced Security: </strong>By leveraging blockchain's inherent security features, Web3 sites are safeguarded against many common cyber threats, ensuring both user data and website content remain secure.</li>
                    <li><strong>Smart Contract Integration: </strong>Web3 sites often utilize smart contracts - self-executing contracts with terms directly written into code lines. This allows for trustless transactions and automations, making processes like payments, verifications, or content delivery more efficient and transparent.</li>
                </ul>
                <p><strong>Why Web3 Sites Matter: </strong></p>
                <p>The evolution from traditional web (Web1 and Web2) to Web3 is a significant leap towards a more open, user-centric, and decentralized internet. Web3 sites represent this shift, emphasizing user autonomy, peer-to-peer interactions, and a break from traditional centralized controls.</p>
                <p><strong>Conclusion:</strong></p>
                <p>A Web3 site is more than just a digital space; it embodies the ethos of a new internet era. An era where users reclaim control, where interactions are direct and transparent, and where the web's decentralized fabric ensures freedom and innovation. As you navigate the vast horizons of Web3, understanding and leveraging the power of Web3 sites becomes pivotal. Stay with Web3onboarding.com as we continue to illuminate your path in this digital renaissance.</p>
            </div>
        },
        {
            id: 2, question: 'Why do I need a web3 site?', isOpen: false, answer: <div>
                <p><strong>Why Do I Need a Web3 Site? Embracing the Next Digital Frontier</strong></p>
                <p>The digital landscape is undergoing a seismic shift, evolving from the centralized frameworks of the past towards a decentralized future. As you stand at this juncture, you might wonder, "Why do I need a Web3 site?" Let's explore the compelling reasons to make the leap into the decentralized web.</p>
                <ul className='my-2 list-decimal'>
                    <li><strong>Digital Sovereignty: </strong>Web3 sites hand back control to the user. Without relying on centralized entities for hosting, operations, or storage, you maintain total sovereignty over your site's content, data, and operations.</li>
                    <li><strong>Enhanced Security & Trust: </strong>Leveraging blockchain's inherent security protocols, Web3 sites are fortified against many common web vulnerabilities. This decentralized approach also fosters a transparent environment, where every transaction or change is recorded, building trust among users.</li>
                    <li><strong>Censorship Resilience: </strong>In a world where content can be easily controlled, muted, or removed by centralized authorities, Web3 sites stand as bastions of free expression. Their decentralized nature ensures that your site remains accessible, irrespective of geo-political influences.</li>
                    <li><strong>Direct Peer-to-Peer Interactions: </strong>Eliminating middlemen, Web3 sites enable direct interactions between users. Whether it's transactions, communications, or collaborations, everything becomes more straightforward and efficient.</li>
                    <li><strong>Future-Proof Your Digital Presence: </strong>As the momentum shifts towards a decentralized internet, having a Web3 site ensures you're ahead of the curve. You'll be well-prepared to harness emerging tools, platforms, and opportunities in the Web3 ecosystem.</li>
                    <li><strong>Holistic Web3 Integration: </strong>With a Web3 site, you can seamlessly integrate decentralized applications (DApps), smart contracts, and other Web3 services, enhancing functionality and user engagement.</li>
                    <li><strong>Economic Opportunities: </strong>Monetizing a Web3 site is direct and flexible. From token integrations, DeFi protocols, to innovative monetization models like token-gated content, the economic potential is vast and multifaceted.</li>
                    <li><strong>Fostering Community Ownership: </strong>Web3 sites can integrate DAOs (Decentralized Autonomous Organizations) and community governance models, allowing users to have a say in the site's direction, updates, or content—nurturing a more engaged and invested community.</li>
                  </ul>
                <p><strong>Conclusion:</strong></p>
                <p>Owning a Web3 site is more than just establishing a digital presence; it's a declaration of autonomy, innovation, and forward-thinking. In this new era, where data privacy, user control, and decentralized governance are paramount, a Web3 site empowers you to navigate the digital realm with confidence and vision. Dive into this burgeoning frontier, and carve your niche in the future of the web</p>
            </div>
        },
        {
            id: 3, question: 'Where can I safely get a web3 site?', isOpen: false, answer: <div>
                <p>As the digital landscape tilts towards decentralization, securing a trustworthy and efficient space in the Web3 realm becomes crucial. If you're pondering, "Where can I establish a Web3 site?", look no further. We've got you covered.</p>
                <p><strong>QuickBuild - Your Direct Portal to the Web3 Universe:</strong></p>
                <p>proudly presents the QuickBuild platform, our bespoke Web3 website builder, engineered to make your journey into the decentralized web both simple and seamless.</p>
                <ul className='my-2 list-disc'>
                    <li><strong>Drag-and-Drop Mechanic: </strong>Regardless of your technical expertise, QuickBuild's intuitive drag- and-drop interface ensures that crafting a Web3 site is a breeze.</li>
                    <li><strong>Robust & Secure Framework: </strong>Harnessing the power of blockchain, QuickBuild provides an inherently secure foundation for your Web3 site, ensuring resilience and trust.</li>
                   </ul>
                <p><strong>Start Building Now: </strong>Dive straight into the future and commence your Web3 site building journey with QuickBuild <a href='/quickbuild' className='text-blue-500 underline'>here.</a></p>
                <p><strong>Other Avenues to Explore:</strong></p>
                <ul className='my-2 list-decimal'>
                    <li><strong>Decentralized Hosting Platforms: </strong>Platforms like IPFS or Arweave offer decentralized web hosting services, allowing you to upload and distribute your website content across a peer- to-peer network.</li>
                    <li><strong>Web3 CMS Solutions: </strong>There are emerging content management systems specifically designed for the Web3 environment, offering tools and templates for decentralized site creation.</li>
                    <li><strong>Web3 Development Agencies: </strong>Specialized agencies are emerging that offer tailored Web3 site development, helping you from conceptualization to launch.</li>
                    <li><strong>Open-Source Frameworks: </strong>For those with a tech-savvy inclination, there are open-source tools and frameworks available to handcraft a Web3 site, ensuring both flexibility and customization.</li>
                    <p><strong>Conclusion:</strong></p>
                    <p>Establishing your footprint in the decentralized web is a monumental step forward, and where you set up your Web3 site matters immensely. With our QuickBuild platform and the plethora of available avenues, creating a Web3 site is now more accessible, secure, and versatile than ever. Embrace this digital evolution with Web3onboarding.com as your trusted ally. Let's build the future, one block at a time!</p>
                </ul>
            </div>
        },
    ]);
    const [lastClickedElement,setLastClickedElement] = useState(false);
    const toggleQuestion = (id,e) => {
        setQuestions(questions.map(item => id === item.id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }))
        setLastClickedElement(e.currentTarget);
    }
    const handleTransitionEnd = () =>{
        if(lastClickedElement!=false){
            lastClickedElement.scrollIntoView(true,{behavior: 'instant'});
            setLastClickedElement(false);
        }
    };
    return (
        <>
        <MetadataHelper noindex title="Quickbuild" />
        <div className='bg-image4 min-h-screen flex-center section-center'>
            <div className="container max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
                <div className="col-span-1">
                    <div className="max-w-[400px] mx-auto">
                        <h2 className='text-24 lg:text-[40px] text-center font-semibold text-white'>Quickbuild</h2>
                        <div className="mt-3 min-h-[310px] flex-center border border-white text-center rounded-xl overflow-hidden p-4 text-18 lg:text-20  bg-primary-newBgColor2/40 text-white">At its essence, a Web3 site operates in the broader sphere of the decentralized web, known as Web3. Unlike traditional websites that rely on centralized servers, databases, and authorities, Web3 sites function on a decentralized network, primarily supported by blockchain technology.</div>
                        <div className="flex items-center justify-between pt-2">
                            {images.map((img, index) => (
                                <Image key={index} className='max-w-[100px] lg:max-w-[130px]' src={img} width={300} height={300} />))}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 space-y-3 text-white">
                    {questions.map((item) => (
                        <div key={item.id} onClick={(e) => toggleQuestion(item.id,e)} className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl max-w-[520px] mx-auto gap-1 border border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center"><h3 className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center'>{item.question}</h3></div>
                                <span className="text-20 lg:text-26">
                                    {item.isOpen ? reactIcons.minus : reactIcons.plus}
                                </span>
                            </div>
                            <Collapse in={item.isOpen} className='' onTransitionEnd={handleTransitionEnd}>
                                <div className='lg:pt-2 lg:pl-4 font-normal text-base [&_strong]:text-white [&_p]:text-white/80 [&_li]:text-white/80 [&_p]:mb-2 [&_p]:text-14 [&_li]:mb-2 [&_li]:text-14'>
                                    {item.answer}
                                </div>
                            </Collapse>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default QuickBuild